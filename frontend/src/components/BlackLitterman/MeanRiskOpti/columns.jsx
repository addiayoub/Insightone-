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
