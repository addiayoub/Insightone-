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
};
module.exports = statsPipelines;
