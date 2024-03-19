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
        <span className="">{row.Weight.toFixed(2)}%</span>
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
