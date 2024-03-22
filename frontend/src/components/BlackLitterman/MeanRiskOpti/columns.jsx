import { IconButton } from "@mui/material";
import { Trash2 } from "react-feather";

const obj = {
  Assets: "ADH",
  Industry: "PARTICIPATION ET PROMOTION IMMOBILIERES",
};
export const assetClassesColumns = [
  {
    field: "Assets",
    headerName: "Assets",
    // width: 200,
    flex: 0.5,
    renderCell: (params) => <strong>{params.row.Assets}</strong>,
  },
  {
    field: "Industry",
    headerName: "Industry",
    // width: 200,
    flex: 0.5,
    renderCell: (params) => <strong>{params.row.Industry}</strong>,
  },
];
const o = {
  Type: "Classes",
  Position: "BANQUES",
  Sign: ">=",
  Weight: 0.02,
  "Type Relative": "Classes",
  Relative: "BATIMENT & MATERIAUX DE CONSTRUCTION",
};
export const getColumns = (handler) => {
  return [
    {
      field: "Type",
      headerName: "Type",
    },
    {
      field: "Position",
      headerName: "Position",
      renderCell: ({ row }) => <span className="text-xs">{row.Position}</span>,
    },
    {
      field: "Sign",
      headerName: "Sign",
    },
    {
      field: "Weight",
      headerName: "Poids",
      renderCell: ({ row }) => (
        <span className="">{(row.Weight * 100).toFixed(2)}%</span>
      ),
    },
    {
      field: "Type Relative",
      headerName: "Type Relative",
    },
    {
      field: "Relative",
      headerName: "Position Relative",
      renderCell: ({ row }) => <span className="text-xs">{row.Relative}</span>,
    },
    {
      field: "Actions",
      headerName: "Actions",
      renderCell: ({ row }) => (
        <IconButton onClick={() => handler(row.id)}>
          <Trash2 className="text-error" size={20} />
        </IconButton>
      ),
    },
  ];
};

const dd = {
  "": "Mean Return (1)",
  Values: "0.0443%",
  "(Return - MAR)/Risk": "",
};
const headers = {
  names: [
    "Profitability and Other Inputs",
    "Risk Measures based on Returns",
    "Risk Measures based on Drawdowns (3)",
  ],
  style:
    "bg-indigo-600 text-white h-full w-full flex justify-center items-center",
};
const checkHeader = (row) => {
  if (
    headers.names.includes(row[""]) &&
    row.Values === "" &&
    row["(Return - MAR)/Risk"] === ""
  ) {
    return true;
  }
  return false;
};
export const indicColumns = [
  {
    field: "h",
    headerName: "",
    // width: 200,
    flex: 0.5,
    renderCell: ({ row }) => {
      const isHeader = checkHeader(row);
      return (
        <strong className={`${isHeader ? headers.style : "block mx-4"}`}>
          {row[""]}
        </strong>
      );
    },
  },
  {
    field: "Values",
    headerName: "Values",
    // width: 200,
    flex: 0.5,
    renderCell: ({ row }) => {
      const isHeader = checkHeader(row);
      return (
        <span className={`${isHeader ? headers.style : "font-medium"}`}>
          {row.Values}
        </span>
      );
    },
  },
  {
    field: "(Return - MAR)/Risk",
    headerName: "(Return - MAR)/Risk",
    // width: 200,
    flex: 0.5,
    renderCell: ({ row }) => {
      const isHeader = checkHeader(row);
      return (
        <span className={`${isHeader ? headers.style : "font-medium"}`}>
          {row["(Return - MAR)/Risk"]}
        </span>
      );
    },
  },
];
