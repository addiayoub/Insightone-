import moment from "moment";
import TextColor from "../../Dashboard/TextColor";
import { formatNumberWithSpaces } from "../../../utils/formatNumberWithSpaces";

export const keyPerfColumns = [
  {
    field: "Metric",
    headerName: "Metric",
    flex: 1,
  },
  {
    field: "OPC ACTIONS FGP AJUSTE",
    headerName: "OPC ACTIONS FGP AJUSTE",
    flex: 0.8,
  },
  {
    field: "ptf-min-var",
    headerName: "ptf-min-var",
    flex: 0.8,
  },
  {
    field: "MASI",
    headerName: "MASI",
    flex: 0.8,
  },
];

export const generateKeyPerfColumns = (keys) => {
  let basedColumns = [
    {
      field: "Metric",
      headerName: "Metric",
      width: 150,

      renderCell: (params) => {
        const value = params.row.Metric;
        // if (value === "") {
        //   return "".repeat(20);
        // }
        return value;
      },
    },
  ];
  keys.forEach((item) => {
    basedColumns.push({
      field: item,
      headerName: item,
      // flex: 0.8,
      width: 150,
      renderCell: (params) => {
        const value = params.row[item];
        if (value === "") {
          // return "-".repeat(16);
        } else {
          const formattedDate = moment(params.row[item]).format("DD/MM/YYYY");
          const isDate = moment(params.row[item], true).isValid();
          return isDate ? formattedDate : value;
        }
      },
    });
  });
  return basedColumns;
};

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

export const contribColumns = [
  {
    field: "titre",
    headerName: "Titre",
    width: 200,
    flex: 0.3,
    renderCell: (params) => <strong>{params.row.titre}</strong>,
  },
  {
    field: "date_debut",
    headerName: "Date début",
    renderCell: (params) => moment(params.row.date_debut).format("DD/MM/YYYY"),
  },
  {
    field: "date_fin",
    headerName: "Date fin",
    renderCell: (params) => moment(params.row.date_fin).format("DD/MM/YYYY"),
  },
  {
    field: "cours_initial",
    headerName: "Cours initial",
    flex: 0.25,
    headerAlign: "center",
    renderCell: (params) => (
      <span className="text-right min-w-[100px]">
        {formatNumberWithSpaces(params.row.cours_initial)}
      </span>
    ),
  },
  {
    field: "cours_final",
    headerName: "Cours final",
    flex: 0.25,
    headerAlign: "center",
    renderCell: (params) => (
      <span className="text-right min-w-[100px]">
        {formatNumberWithSpaces(params.row.cours_final)}
      </span>
    ),
  },
  {
    field: "poids_initial",
    headerName: "Poids initial (%)",
    align: "center",
    flex: 0.2,
    renderCell: (params) => params.row.poids_initial.toFixed(2),
  },
  {
    field: "poids_final",
    headerName: "Poids final (%)",
    align: "center",
    flex: 0.2,
    renderCell: (params) => params.row.poids_final.toFixed(2),
  },
  {
    field: "perf_ptf",
    headerName: "Performance PTF (%)",
    align: "center",
    flex: 0.2,
    renderCell: (params) => {
      const val = (params.row.perf_ptf * 100).toFixed(2);
      return <TextColor value={val} />;
    },
  },
  {
    field: "contrib_ptf",
    headerName: "Contrib PTF (%)",
    align: "center",
    flex: 0.2,
    renderCell: (params) => {
      const val = params.row.contrib_ptf.toFixed(2);
      return <TextColor value={val} />;
    },
  },
];

export const worstDrawdownsColumns = [
  {
    field: "Started",
    headerName: "Started",
    renderCell: (params) => moment(params.row.Started).format("DD/MM/YYYY"),
    flex: 1,
  },
  {
    field: "Recovered",
    headerName: "Recovered",
    flex: 1,
    renderCell: (params) => moment(params.row.Recovered).format("DD/MM/YYYY"),
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
