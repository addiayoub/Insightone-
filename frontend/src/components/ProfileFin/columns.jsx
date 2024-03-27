import moment from "moment";
import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces";

const determineLevel = (str) => {
  const length = str.length;
  const ref = {
    0: {
      padding: 8,
      length,
      level: 0,
    },
    1: {
      padding: 25,
      length,
      level: 1,
    },
    2: {
      padding: 35,
      length,
      level: 2,
    },
  };
  switch (length) {
    case 2:
      return ref[0];
    case 4:
      return ref[1];
    case 6:
      return ref[2];
    default:
      return ref[0];
  }
};
const isDate = (value) => {
  return value.toLowerCase() === "date";
};
const isHeader = (data, ordre) => {
  const hasChildren = () => {
    const count = data.reduce((acc, obj) => {
      if (obj.ordre.startsWith(ordre)) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return count > 1;
  };
  return ordre.length === 2 && hasChildren();
};
const parentStyle =
  "bg-primary h-full w-full flex items-center justify-start text-white";
export const bilanCols = (data) => {
  return [
    {
      field: "a",
      headerName: "",
      flex: 0.7,
      // renderHeader: ({row}) => row.a,
      renderCell: ({ row }) => {
        const value = row.a;
        const { padding, level } = determineLevel(row.ordre);
        const isColored = !isDate(value) && isHeader(data, row.ordre);
        return (
          <span
            className={`block ${isColored ? parentStyle : ""} ${
              level === 0 ? "font-semibold" : ""
            }`}
            style={{ paddingLeft: padding }}
          >
            {isDate(value) ? "" : value}{" "}
          </span>
        );
      },
    },
    {
      field: "b",
      headerName: "",
      flex: 0.4,
      renderCell: ({ row }) => {
        const value = row.b;
        const isParent = isHeader(data, row.ordre) && !isDate(value);
        return (
          <span className={`${isParent ? parentStyle : ""}`}>{value}</span>
        );
      },
    },
    {
      field: "c",
      headerName: "",
      flex: 0.4,
      renderCell: ({ row }) => {
        const value = row.c;
        const isParent = isHeader(data, row.ordre);
        return (
          <span className={`${isParent ? parentStyle : ""}`}>{value}</span>
        );
      },
    },
    {
      field: "d",
      headerName: "",
      flex: 0.4,
      renderCell: ({ row }) => {
        const value = row.d;
        const isParent = isHeader(data, row.ordre);
        return (
          <span className={`${isParent ? parentStyle : ""}`}>{value}</span>
        );
      },
    },
  ];
};
const dd1 = {
  date_paiement: "2023-07-05T00:00:00.000+00:00",
  TITRE_NAME: "DISWAY",
  type_dividende: "Ordinaire",
  annee: 2022,
  date_detachement: "2023-06-22T00:00:00.000+00:00",
  montant_dividende: 35.0,
};
export const dividendeCols = [
  {
    field: "date_detachement",
    headerName: "Date de détachement",
    flex: 0.5,
    renderCell: ({ row }) => {
      return <span>{moment(row.date_detachement).format("DD/MM/YYYY")}</span>;
    },
  },
  {
    field: "montant_dividende",
    headerName: "Dividende",
    flex: 0.4,
  },
  {
    field: "type_dividende",
    headerName: "Type",
    flex: 0.4,
  },
  {
    field: "date_paiement",
    headerName: "Date de paiement",
    flex: 0.4,
    renderCell: ({ row }) => {
      return <span>{moment(row.date_paiement).format("DD/MM/YYYY")}</span>;
    },
  },
];

const resDD = {
  PERIODICITE: "Annuel",
  VALEUR: 11606.0,
  Date_Extraction: "2024-03-23T03:38:28.000+00:00",
  CATEGORIE: "Résultat des opérations",
  ORDRE: 3,
  SEANCE: "2023-12-31T00:00:00.000+00:00",
  NOM: "Itissalat Al-Maghrib",
  SYMBOLE: "IAM",
};
export const res = [
  {
    field: "",
    headerName: "CATEGORIE",
    flex: 0.4,
    renderCell: ({ row }) => {
      return <span>{row.CATEGORIE}</span>;
    },
  },
];

export const resumeCols = (data) => {
  console.log("resume", data);
  const fields = Object.keys(data[0]);
  // .filter((item) => item !== "SEANCE");
  const headers = data.map((item) => moment(item).format("DD/MM/YYYY"));
  let coll = headers.map((header, index) => ({
    headerName: header,
  }));
  console.log("headers", headers, fields);
  const cols = fields.map((field, index) => {
    coll[index] = {
      ...coll[index],
      field: field,
      flex: 0.4,
      renderCell: ({ row }) => {
        return (
          <span
            className={` ${
              field === "SEANCE" ? "font-semibold" : ""
            } w-full max-w-[66px] text-right`}
          >
            {field}
            {/* {field === "SEANCE"
              ? moment(row[field]).format("DD/MM/YYYY")
              : formatNumberWithSpaces(row[field])} */}
          </span>
        );
      },
    };
    return coll[index];
  });
  const columns = fields.map((field, index) => {
    console.log(`index: ${index} - dd ${data[index] ?? "empty"}`);
    return {
      field,
      headerName: field,
      // headerAlign: "center",
      flex: 0.4,
      renderCell: ({ row }) => {
        return (
          <span
            className={` ${
              field === "SEANCE" ? "font-semibold" : ""
            } w-full max-w-[66px] text-right`}
          >
            {field === "SEANCE"
              ? moment(row[field]).format("DD/MM/YYYY")
              : formatNumberWithSpaces(row[field])}
          </span>
        );
      },
    };
  });
  console.log("columns", columns);
  return columns;
};
