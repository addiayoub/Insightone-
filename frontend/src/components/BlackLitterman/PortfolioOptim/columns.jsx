const obj = {
  random_weights: 0.045808200669106514,
  rebalance_weights: 0.07492517692048925,
};
export const weightsColumns = [
  {
    field: "random_weights",
    headerName: "Random weights",
    width: 200,
    flex: 0.5,
    renderCell: (params) => (
      <strong>{params.row.random_weights?.toFixed(2)}</strong>
    ),
  },
  {
    field: "rebalance_weights",
    headerName: "Rebalance Weights",
    // width: 200,
    flex: 0.5,
    renderCell: (params) => (
      <strong>{params.row.random_weights?.toFixed(2)}</strong>
    ),
  },
];

const mat = {
  "Expected Portfolio Returns": 0.053551955131851736,
  "Expected Portfolio Volatility": 0.137436147188339,
  "Portfolio Sharpe Ratio": 0.3896497117200579,
};
export const metricsColumns = [
  {
    field: "Expected Portfolio Returns",
    headerName: "Expected Portfolio Returns",
    width: 200,
    flex: 0.5,
    renderCell: (params) => (
      <strong>{params.row["Expected Portfolio Returns"]?.toFixed(2)}</strong>
    ),
  },
  {
    field: "Expected Portfolio Volatility",
    headerName: "Expected Portfolio Volatility",
    width: 200,
    flex: 0.5,
    renderCell: (params) => (
      <strong>{params.row["Expected Portfolio Volatility"]?.toFixed(2)}</strong>
    ),
  },
  {
    field: "Portfolio Sharpe Ratio",
    headerName: "Portfolio Sharpe Ratio",
    width: 200,
    flex: 0.5,
    renderCell: (params) => (
      <strong>{params.row["Portfolio Sharpe Ratio"]?.toFixed(2)}</strong>
    ),
  },
];

const sim = {
  Returns: 0.05668463353710577,
  Volatility: 0.13892560985280977,
  "Sharpe Ratio": 0.40802148428329765,
  "Portfolio Weights": "[0.25232391 0.30553617 0.44213992]",
};

export const simulationsColumns = [
  {
    field: "Returns",
    headerName: "Returns",
    width: 200,
    flex: 0.5,
    renderCell: (params) => <strong>{params.row.Returns?.toFixed(2)}</strong>,
  },
  {
    field: "Sharpe Ratio",
    headerName: "Sharpe Ratio",
    width: 200,
    flex: 0.5,
    renderCell: (params) => (
      <strong>{params.row["Sharpe Ratio"]?.toFixed(2)}</strong>
    ),
  },
  {
    field: "Volatility",
    headerName: "Volatility",
    width: 200,
    flex: 0.5,
    renderCell: (params) => <strong>{params.row.Volatility.toFixed(2)}</strong>,
  },
  {
    field: "Portfolio Weights",
    headerName: "Portfolio Weights",
    width: 200,
    flex: 0.5,
    renderCell: (params) => <strong>{params.row["Portfolio Weights"]}</strong>,
  },
];

const h = {
  "OPTIMIZED WEIGHTS": 1,
  "OPTIMIZED METRICS": 0.04120147520235175,
};

export const optimizedColumns = [
  {
    field: "OPTIMIZED WEIGHTS",
    headerName: "OPTIMIZED WEIGHTS",
    width: 200,
    flex: 0.5,
    renderCell: (params) => (
      <strong>{params.row["OPTIMIZED WEIGHTS"]?.toFixed(3)}</strong>
    ),
  },
  {
    field: "OPTIMIZED METRICS",
    headerName: "OPTIMIZED METRICS",
    // width: 200,
    flex: 0.5,
    renderCell: (params) => (
      <strong>{params.row["OPTIMIZED METRICS"]?.toFixed(3)}</strong>
    ),
  },
];
