const statsPipelines = {
  totalPtfs: [
    {
      $unwind: "$portefeuilles",
    },
    {
      $unwind: "$portefeuilles",
    },
    {
      $group: {
        _id: null,
        totalPtfs: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        _id: 0,
        totalPtfs: 1,
      },
    },
  ],
  ptfsByType: [
    {
      $unwind: "$portefeuilles",
    },
    {
      $group: {
        _id: null,
        OPCVM: {
          $sum: {
            $cond: [{ $eq: ["$portefeuilles.type", "OPCVM"] }, 1, 0],
          },
        },
        Actions: {
          $sum: {
            $cond: [{ $eq: ["$portefeuilles.type", "Actions"] }, 1, 0],
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
  ],
  apiLogsByUser: [
    {
      $unwind: {
        path: "$apiLogs",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: "$_id",
        username: { $first: "$username" },
        count: { $sum: { $cond: [{ $ifNull: ["$apiLogs", false] }, 1, 0] } },
      },
    },
  ],
  apiLogsByType: [
    {
      $unwind: "$apiLogs",
    },
    {
      $group: {
        _id: null,
        FASTAPI: {
          $sum: {
            $cond: [{ $eq: ["$apiLogs.type", "FASTAPI"] }, 1, 0],
          },
        },
        GETAPI: {
          $sum: {
            $cond: [{ $eq: ["$apiLogs.type", "GETAPI"] }, 1, 0],
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
  ],
};

function calculateExecutionTimeStats(apiLogs) {
  if (!apiLogs || apiLogs.length === 0) {
    return null; // Return null if there are no API logs
  }

  // Extract execution times from API logs
  const executionTimes = apiLogs.map((log) => log.executionTime);

  // Calculate statistics
  const totalExecutionTime = executionTimes.reduce(
    (acc, curr) => acc + curr,
    0
  );
  const averageExecutionTime = totalExecutionTime / executionTimes.length;
  const maxExecutionTime = Math.max(...executionTimes);
  const minExecutionTime = Math.min(...executionTimes);

  return {
    total: parseFloat(totalExecutionTime.toFixed(2)),
    average: isNaN(averageExecutionTime)
      ? 0
      : parseFloat(averageExecutionTime.toFixed(2)), // Handle division by zero
    max: maxExecutionTime,
    min: minExecutionTime,
  };
}
module.exports = { statsPipelines, calculateExecutionTimeStats };
