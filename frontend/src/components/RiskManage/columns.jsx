import { createColumns } from "../../utils/createColumns";
import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces";
import TextColor from "../Dashboard/TextColor";

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
    renderCell: ({ row }) => <strong>{row.metric}</strong>,
  },
  {
    field: "value",
    headerName: "Valeur",
    // width: 200,
    flex: 0.3,
    renderCell: ({ row }) => {
      console.log("VALUE", row);
      return formatNumberWithSpaces(row.value);
    },
  },
];
export const varCvarColumns1 = [
  {
    field: "metric",
    headerName: "Metric",
    // width: 200,
    flex: 0.7,
    renderCell: ({ row }) => <strong>{row.metric}</strong>,
  },
  {
    field: "VaR",
    headerName: "VaR",
    // width: 200,
    flex: 0.3,
    renderCell: ({ row }) => formatNumberWithSpaces(row.VaR),
  },
  {
    field: "CVaR",
    headerName: "CVaR",
    // width: 200,
    // flex: 0.5,
    renderCell: ({ row }) => formatNumberWithSpaces(row.CVaR),
  },
];

const a = {
  metric: "Historical",
  "VaR 95th CI (5 days) %": 2.682,
  "CVaR 95th CI (5 days) %": 4.478,
};
const varCvarDef = [
  { field: "metric", headerName: "Metric" },
  {
    field: "VaR 95th CI (5 days) %",
    headerName: "VaR 95th CI (5 days) %",
    isNum: true,
    flex: 0.5,
  },
  {
    field: "CVaR 95th CI (5 days) %",
    headerName: "CVaR 95th CI (5 days) %",
    isNum: true,
    flex: 0.5,
  },
];

export const varCvarColumns = createColumns(varCvarDef);

const cols = [
  { field: "type", headerName: "" },
  {
    field: "valeur",
    headerName: "Valeur",
    headerAlign: "left",
    width: 90,
    flex: 0.3,
  },
  {
    field: "rendement",
    headerName: "Rendement",
    // headerAlign: "center",
    width: 90,
    isNum: true,
    isPerce: true,
    flex: 0.5,
    renderCell: (row) => {
      console.log("row is", row);
      const value = row["rendement"];
      return <TextColor value={value} percentage />;
    },
  },
];
export const previsionCols = createColumns(cols);
