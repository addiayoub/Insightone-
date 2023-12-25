import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { v4 as uuidv4 } from "uuid";

const columns = [
  {
    field: "Societe_Gestion",
    headerName: "Société de gestion",
    // flex: 0.6,
    width: 360,
  },
  {
    field: "Classification",
    headerName: "Classification",
    // flex: 0.3,
    width: 360,
    valueGetter: (params) => params.row.Classification,
  },
  {
    field: "DENOMINATION_OPCVM",
    headerName: "LIBELLE",
    // flex: 0.7,
    width: 360,
  },
  {
    field: "Performance",
    headerName: "Performance",
    headerAlign: "center",
    align: "center",
    // flex: 0.3,
    width: 360,
  },
  {
    field: "Performance_AN",
    headerName: "Performance Anualisé",
    headerAlign: "center",
    align: "center",
    // flex: 0.3,
    width: 360,
  },
  {
    field: "Volatilite",
    headerName: "Volatilité",
    headerAlign: "center",
    align: "center",
    // flex: 0.25,
    width: 360,
  },
  {
    field: "EM_Hebdo",
    headerName: "Encours (MMAD)",
    headerAlign: "center",
    align: "center",
    // flex: 0.7,
    width: 360,
  },
  {
    field: "Nb_Semaine",
    headerName: "Nombre de semaines",
    headerAlign: "center",
    align: "center",
    // flex: 0.2,
    width: 360,
  },
];

const rows = [
  {
    Societe_Gestion: "AD CAPITAL",
    Classification: "ACTIONS",
    key_opcvm: 249,
    Code_OPCVM: 37079,
    DENOMINATION_OPCVM: "AD MOROCCAN EQUITY FUND",
    Performance: 0.09924463519313309,
    Performance_AN: 0.019321127789272197,
    Volatilite: 0.129806498304438,
    Nb_Semaine: 259,
    EM_Hebdo: 302148143.60281855,
    date_deb: "2018-12-28T00:00:00.000Z",
    date_fin: "2023-12-08T00:00:00.000Z",
  },
  {
    Societe_Gestion: "AD CAPITAL",
    Classification: "OMLT",
    key_opcvm: 250,
    Code_OPCVM: 37087,
    DENOMINATION_OPCVM: "AD BONDS",
    Performance: 0.07560113053729056,
    Performance_AN: 0.014848534061808749,
    Volatilite: 0.031951915606626295,
    Nb_Semaine: 259,
    EM_Hebdo: 1008583292.3684937,
    date_deb: "2018-12-28T00:00:00.000Z",
    date_fin: "2023-12-08T00:00:00.000Z",
  },
  {
    Societe_Gestion: "AD CAPITAL",
    Classification: "MONETAIRE",
    key_opcvm: 251,
    Code_OPCVM: 37095,
    DENOMINATION_OPCVM: "AD CASH",
    Performance: 0.18760938033670982,
    Performance_AN: 0.03538574474695677,
    Volatilite: 0.025672492118087545,
    Nb_Semaine: 259,
    EM_Hebdo: 942685686.3846339,
    date_deb: "2018-12-28T00:00:00.000Z",
    date_fin: "2023-12-08T00:00:00.000Z",
  },
  {
    Societe_Gestion: "AD CAPITAL",
    Classification: "OCT",
    key_opcvm: 304,
    Code_OPCVM: 37624,
    DENOMINATION_OPCVM: "AD YIELD FUND",
    Performance: 0.12719207104975472,
    Performance_AN: 0.02450997611346506,
    Volatilite: 0.0062064580636086,
    Nb_Semaine: 259,
    EM_Hebdo: 1182194945.779344,
    date_deb: "2018-12-28T00:00:00.000Z",
    date_fin: "2023-12-08T00:00:00.000Z",
  },
  {
    Societe_Gestion: "AD CAPITAL",
    Classification: "MONETAIRE",
    key_opcvm: 305,
    Code_OPCVM: 37632,
    DENOMINATION_OPCVM: "AD FIXED INCOME FUND",
    Performance: 0.10013153567905508,
    Performance_AN: 0.01948740178004882,
    Volatilite: 0.0018861274655336854,
    Nb_Semaine: 259,
    EM_Hebdo: 562044776.0154444,
    date_deb: "2018-12-28T00:00:00.000Z",
    date_fin: "2023-12-08T00:00:00.000Z",
  },
  {
    Societe_Gestion: "AD CAPITAL",
    Classification: "DIVERSIFIE",
    key_opcvm: 306,
    Code_OPCVM: 37640,
    DENOMINATION_OPCVM: "AD BALANCED FUND",
    Performance: -0.008757022612313148,
    Performance_AN: -0.001777261260822116,
    Volatilite: 0.08971198579916344,
    Nb_Semaine: 259,
    EM_Hebdo: 430900012.9776448,
    date_deb: "2018-12-28T00:00:00.000Z",
    date_fin: "2023-12-08T00:00:00.000Z",
  },
  {
    Societe_Gestion: "AD CAPITAL",
    Classification: "OCT",
    key_opcvm: 676,
    Code_OPCVM: 39141,
    DENOMINATION_OPCVM: "AD SELECT BANK",
    Performance: 0.04519553742802551,
    Performance_AN: 0.025111189008333756,
    Volatilite: 0.005947804446532414,
    Nb_Semaine: 94,
    EM_Hebdo: 317923095.80606383,
    date_deb: "2022-02-25T00:00:00.000Z",
    date_fin: "2023-12-08T00:00:00.000Z",
  },
  {
    Societe_Gestion: "AD CAPITAL",
    Classification: "OMLT",
    key_opcvm: 677,
    Code_OPCVM: 39158,
    DENOMINATION_OPCVM: "AD COMPACT OBLIGATAIRE",
    Performance: -0.006803263970632245,
    Performance_AN: -0.0038227566002173585,
    Volatilite: 0.03217200244104757,
    Nb_Semaine: 94,
    EM_Hebdo: 266403906.93127662,
    date_deb: "2022-02-25T00:00:00.000Z",
    date_fin: "2023-12-08T00:00:00.000Z",
  },
];

export default function DataGridDemo() {
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
