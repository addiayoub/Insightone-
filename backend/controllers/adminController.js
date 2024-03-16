const User = require("../models/userModel");
const statsPipelines = require("../utils/admin");

class _AdminController {
  async getStats(req, res) {
    try {
      // Number of Users
      const totalUsers = await User.countDocuments();
      // Number of Active Users
      const activeUsers = await User.countDocuments({ isDeleted: false });
      // Number of Active Users
      const notActiveUsers = await User.countDocuments({ isDeleted: true });
      // Number of Admin Users
      const adminUsers = await User.countDocuments({ isAdmin: true });

      const [totalPtfsRes] = await Promise.all([
        User.aggregate(statsPipelines.totalPtfs),
      ]);
      const totalPtfs = totalPtfsRes[0]?.totalPtfs || 0;
      return res.status(200).json({
        totalUsers,
        activeUsers,
        notActiveUsers,
        adminUsers,
        totalPtfs,
      });
    } catch (error) {
      console.log("error");
      return res.status(500).json({ error: error.message });
    }
  }
}

const adminController = new _AdminController();
module.exports = adminController;
