const User = require("../models/userModel");
const {
  calculateExecutionTimeStats,
  statsPipelines,
} = require("../utils/admin");
class _AdminController {
  async getStats(req, res) {
    try {
      const users = await User.find();
      // Extract API logs from all users
      const allApiLogs = users.flatMap((user) => user.apiLogs);

      // Calculate execution time stats
      const executionTimeStats = calculateExecutionTimeStats(allApiLogs);
      const userApiLogs = await User.aggregate([
        {
          $sort: { createdAt: -1 },
        },
        {
          $project: {
            username: 1,
            apiLogs: 1,
          },
        },
      ]);
      // Number of Users
      const totalUsers = await User.countDocuments();
      // Number of Active Users
      const activeUsers = await User.countDocuments({ isDeleted: false });
      // Number of Active Users
      const notActiveUsers = await User.countDocuments({ isDeleted: true });
      // Number of Admin Users
      const adminUsers = await User.countDocuments({ isAdmin: true });

      const [totalPtfsRes, ptfsByType, apiLogsByUser, apiLogsByType] =
        await Promise.all([
          User.aggregate(statsPipelines.totalPtfs),
          User.aggregate(statsPipelines.ptfsByType),
          User.aggregate(statsPipelines.apiLogsByUser),
          User.aggregate(statsPipelines.apiLogsByType),
        ]);
      const totalPtfs = totalPtfsRes[0]?.totalPtfs || 0;
      return res.status(200).json({
        totalUsers,
        activeUsers,
        notActiveUsers,
        adminUsers,
        totalPtfs,
        ptfsByType: ptfsByType[0],
        userApiLogs,
        executionTimeStats,
        apiLogsByUser,
        apiLogsByType: apiLogsByType[0],
      });
    } catch (error) {
      console.log("error");
      return res.status(500).json({ error: error.message });
    }
  }
  async getCountOfApiLogs(req, res) {
    try {
      // Define thresholds
      const thresholds = [5, 10, 20, 30, 40, 50]; // Add more thresholds as needed
      const portefeuilleStats = await User.aggregate([
        { $unwind: "$portefeuilles" }, // Unwind the portefeuilles array
        {
          $group: {
            _id: null,
            totalPortefeuilles: { $sum: 1 }, // Count total portefeuilles
            actionsCount: {
              $sum: {
                $cond: [{ $eq: ["$portefeuilles.type", "Actions"] }, 1, 0],
              },
            }, // Count portefeuilles with type "Actions"
            opcvmCount: {
              $sum: {
                $cond: [{ $eq: ["$portefeuilles.type", "OPCVM"] }, 1, 0],
              },
            }, // Count portefeuilles with type "OPCVM"
          },
        },
      ]);
      // Aggregate API logs based on thresholds
      const counts = await Promise.all(
        thresholds.map(async (threshold) => {
          const count = await User.aggregate([
            {
              $unwind: "$apiLogs",
            },
            {
              $match: {
                "apiLogs.executionTime": { $gte: threshold },
              },
            },
            {
              $count: "count",
            },
          ]);

          return { threshold, count: count.length > 0 ? count[0].count : 0 };
        })
      );
      const logCounts = await User.aggregate([
        {
          $unwind: "$apiLogs", // Unwind the apiLogs array
        },
        {
          $group: {
            _id: null,
            count5: {
              $sum: {
                $cond: [
                  {
                    $lte: [
                      "$apiLogs.createdAt",
                      new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
                    ],
                  },
                  1,
                  0,
                ],
              },
            }, // Count logs created <= 5 days ago
            count10: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      {
                        $lte: [
                          "$apiLogs.createdAt",
                          new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
                        ],
                      },
                      {
                        $gt: [
                          "$apiLogs.createdAt",
                          new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
                        ],
                      },
                    ],
                  },
                  1,
                  0,
                ],
              },
            }, // Count logs created > 5 days ago and <= 10 days ago
            count20: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      {
                        $lte: [
                          "$apiLogs.createdAt",
                          new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
                        ],
                      },
                      {
                        $gt: [
                          "$apiLogs.createdAt",
                          new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
                        ],
                      },
                    ],
                  },
                  1,
                  0,
                ],
              },
            }, // Count logs created > 10 days ago and <= 20 days ago
            count30: {
              $sum: {
                $cond: [
                  {
                    $gt: [
                      "$apiLogs.createdAt",
                      new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
                    ],
                  },
                  1,
                  0,
                ],
              },
            }, // Count logs created > 20 days ago
          },
        },
      ]);

      res.status(200).json({ counts, portefeuilleStats, logCounts });
    } catch (error) {
      console.error("Error counting API logs:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

const adminController = new _AdminController();
module.exports = adminController;
