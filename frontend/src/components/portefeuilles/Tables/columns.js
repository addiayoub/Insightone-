export const eoyColumns = [
  {
    field: "Year",
    headerName: "Year",
    flex: 1,
  },
  {
    field: "Benchmark",
    headerName: "Benchmark",
    flex: 1,
    renderCell: (params) => params.row.Benchmark.toFixed(2),
  },
  {
    field: "Strategy",
    headerName: "Strategy",
    flex: 1,
    renderCell: (params) => params.row.Strategy.toFixed(2),
  },
  {
    field: "Multiplier",
    headerName: "Multiplier",
    flex: 1,
    renderCell: (params) => params.row.Multiplier.toFixed(2),
  },
  {
    field: "Won",
    headerName: "Won",
    flex: 1,
  },
];

export const worstDrawdownsColumns = [
  {
    field: "Started",
    headerName: "Started",
    flex: 1,
  },
  {
    field: "Recovered",
    headerName: "Recovered",
    flex: 1,
  },
  {
    field: "Drawdown",
    headerName: "Drawdown",
    flex: 1,
    renderCell: (params) => params.row.Drawdown.toFixed(2),
  },
  {
    field: "Days",
    headerName: "Days",
    flex: 1,
  },
];
