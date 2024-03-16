import moment from "moment";
import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces";
import { countUniqueValues } from "../../utils/caluclations";
import { calculateSumPoids } from "../../utils/Markowitz/helpers";

export const getColumns = (ptf) => {
  // const { field } = ptf;
  const { field = "", type = "", data = [] } = ptf;
  const sum = sumSecteur(data, field, "SECTEUR_ACTIVITE");
  console.log("sum", sum);
  if (type === "Actions") {
    return [...columns.actions, getPoids(field)];
  }
  return [...columns.opcvm, getPoids(field)];
};

const getPoids = (field) => ({
  field,
  headerName: "Poids (%)",
  hide: true,
  flex: 0.3,
  renderCell: ({ row }) => {
    const val = row?.[field]?.toFixed(2);
    return (
      <span className="font-semibold"> {formatNumberWithSpaces(val)}</span>
    );
  },
});
const columns = {
  actions: [
    {
      field: "SECTEUR_ACTIVITE",
      headerName: "SECTEUR ACTIVITÉ",
      flex: 1,
      renderCell: ({ row }) => <strong>{row.SECTEUR_ACTIVITE}</strong>,
    },
    {
      field: "titre",
      headerName: "Titre",
      flex: 0.5,
      renderCell: ({ row }) => <strong>{row.titre}</strong>,
    },
  ],
  opcvm: [
    {
      field: "Societe_Gestion",
      headerName: "Société de Gestion",
      flex: 0.6,
      renderCell: ({ row }) => <strong>{row.Societe_Gestion}</strong>,
    },
    {
      field: "Classification",
      headerName: "Classification",
      flex: 0.4,
      renderCell: ({ row }) => <strong>{row.Classification}</strong>,
    },
    {
      field: "titre",
      headerName: "Titre",
      flex: 0.7,
      renderCell: ({ row }) => <strong>{row.titre}</strong>,
    },
  ],
};
const sumSecteur = (data, field, sumOf) => {
  return data.reduce((acc, row) => {
    const secteur = row[sumOf];
    acc[secteur] = (acc[secteur] || 0) + (row[field] || 0);
    return acc;
  }, {});
};

export const cols = [
  {
    field: "name",
    headerName: "PTF",
    renderCell: ({ row }) => <strong>{row.name}</strong>,
    flex: 1,
  },
  {
    field: "type",
    headerName: "Type",
    flex: 0.3,
    renderCell: ({ row }) => <strong>{row.type}</strong>,
  },
  {
    field: "createdAt",
    headerName: "Date de création",
    flex: 0.4,
    renderCell: ({ row }) => moment(row.createdAt).format("DD/MM/YYYY"),
  },
  {
    field: "params-1",
    headerName: "Date début BKT",
    flex: 0.4,
    renderCell: ({ row }) => row.params.dateDebut,
  },
  {
    field: "params-2",
    headerName: "Date fin BKT",
    flex: 0.4,
    renderCell: ({ row }) => row.params.dateFin,
  },
  {
    field: "Nb_secteurs",
    headerName: "Nb secteurs",
    renderCell: ({ row }) => {
      const { data, type } = row;
      const secteur =
        type === "Actions" ? "SECTEUR_ACTIVITE" : "Societe_Gestion";
      const res = countUniqueValues(data, secteur);
      return res;
    },
  },
  {
    field: "Nb_titres",
    headerName: "Nb titres",
    width: 150,
    renderCell: ({ row }) => {
      const { data } = row;
      return data.length;
    },
  },
  {
    field: "poids_total",
    headerName: "Poids total (%)",
    flex: 0.4,
    renderCell: ({ row }) => {
      const { data, field } = row;
      return (
        <span className="text-right font-semibold min-w-[50px]">
          {calculateSumPoids(data, field)}
        </span>
      );
    },
  },
];
