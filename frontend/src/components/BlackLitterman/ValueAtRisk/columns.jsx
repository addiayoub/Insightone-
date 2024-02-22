import { formatNumberWithSpaces } from "../../../utils/formatNumberWithSpaces";

const tables = ["historicalVar", "parametricVar", "portfolioSims", "varCvar"];
const obj = {
  metric: "historical 95th CI",
  VaR: 1943.22,
  CVaR: 3417.53,
};
export const historicalVarColumns = [
  {
    field: "metric",
    headerName: "Metric",
    // width: 200,
    flex: 0.5,
    renderCell: (params) => <strong>{params.row.metric}</strong>,
  },
  {
    field: "value",
    headerName: "Valeur",
    // width: 200,
    flex: 0.5,
    renderCell: (params) => formatNumberWithSpaces(params.row.value),
  },
];
export const parametricVarColumns = [
  {
    field: "metric",
    headerName: "Metric",
    // width: 200,
    flex: 0.7,
    renderCell: (params) => <strong>{params.row.metric}</strong>,
  },
  {
    field: "value",
    headerName: "Valeur",
    // width: 200,
    flex: 0.3,
    renderCell: (params) => formatNumberWithSpaces(params.row.value),
  },
];
export const varCvarColumns = [
  {
    field: "metric",
    headerName: "Metric",
    // width: 200,
    flex: 0.7,
    renderCell: (params) => <strong>{params.row.metric}</strong>,
  },
  {
    field: "VaR",
    headerName: "VaR",
    // width: 200,
    flex: 0.3,
    renderCell: (params) => formatNumberWithSpaces(params.row.VaR),
  },
  {
    field: "CVaR",
    headerName: "CVaR",
    // width: 200,
    // flex: 0.5,
    renderCell: (params) => formatNumberWithSpaces(params.row.CVaR),
  },
];
