import { IconButton } from "@mui/material";
import moment from "moment";
import { Eye } from "react-feather";
export const columns = [
  {
    field: "username",
    headerName: "Nom d'utilisateur",
    flex: 0.5,
    renderCell: ({ row: { username } }) => {
      return <span className="font-semibold">{username}</span>;
    },
  },
  {
    field: "apiLog.type",
    headerName: "Type",
    valueGetter: ({ row: { apiLog } }) => apiLog?.type,
    renderCell: ({ row: { apiLog } }) => {
      return <span className="font-semibold">{apiLog?.type}</span>;
    },
  },
  {
    field: "apiLog.baseURL",
    headerName: "URL de base",
    flex: 1,
    width: 360,
    valueGetter: ({ row: { apiLog } }) => apiLog?.baseURL,
    renderCell: ({ row: { apiLog } }) => {
      return <span className="font-semibold">{apiLog?.baseURL}</span>;
    },
  },
  {
    field: "apiLog.url",
    headerName: "endpoint",
    flex: 1,
    width: 360,
    valueGetter: ({ row: { apiLog } }) => apiLog?.url,
    renderCell: ({ row: { apiLog } }) => {
      return <span className="font-semibold">{apiLog?.url}</span>;
    },
  },
  {
    field: "apiLog.method",
    headerName: "Méthode",
    valueGetter: ({ row: { apiLog } }) => apiLog?.method,
    renderCell: ({ row: { apiLog } }) => {
      return <span className="font-semibold">{apiLog?.method}</span>;
    },
  },
  {
    field: "apiLog.executionTime",
    headerName: "Execution Time",
    valueGetter: ({ row: { apiLog } }) => apiLog?.executionTime,
    renderCell: ({ row: { apiLog } }) => {
      return <span className="font-semibold">{apiLog?.executionTime}s</span>;
    },
  },
  {
    field: "apiLog.status",
    headerName: "Status",
    valueGetter: ({ row: { apiLog } }) => apiLog?.status,
    renderCell: ({ row: { apiLog } }) => {
      return <span className="font-semibold">{apiLog?.status}</span>;
    },
  },
  {
    field: "apiLog.createdAt",
    headerName: "Date",
    valueGetter: ({ row: { apiLog } }) => apiLog?.createdAt,
    renderCell: ({ row: { apiLog } }) => {
      return (
        <span className="font-semibold">
          {moment(apiLog?.createdAt).format("DD/MM/YYYY")}
        </span>
      );
    },
  },
  {
    field: "Actions",
    headerName: "Actions",
    valueGetter: ({ row: { apiLog } }) => apiLog?.createdAt,
    renderCell: ({ row: { apiLog } }) => {
      return (
        <IconButton
          className="font-semibold"
          onClick={() =>
            alert(
              `row: ${apiLog.baseURL} ## ${apiLog.type} ## ${apiLog.method}`
            )
          }
        >
          <Eye size={18} className="text-primary cursor-pointer" />
        </IconButton>
      );
    },
  },
];
