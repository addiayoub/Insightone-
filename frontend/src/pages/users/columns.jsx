import { IconButton } from "@mui/material";
import { Edit, Trash2, Eye } from "react-feather";
import { hostName } from "../../api/config";
export const getColumns = (actionsHandler) => {
  return [
    {
      field: "pic",
      headerName: "Profile",
      width: 50,
      flex: 0.5,
      renderCell: ({ row }) => (
        <div className="w-[35px] h-[35px] rounded-[50%] overflow-hidden">
          <img
            src={`${hostName}/images/${row.pic}`}
            alt="user-profile"
            className="h-full w-full object-cover m-auto"
          />
        </div>
      ),
    },
    {
      field: "username",
      headerName: "Nom d'utilisateur",
      width: 360,
      flex: 1,
    },
    {
      field: "isAdmin",
      headerName: "Rôle",
      width: 360,
      flex: 0.5,
      renderCell: (params) => {
        const role = params.value ? "admin" : "user";
        return <span>{role}</span>;
      },
    },
    {
      field: "loginHistory",
      headerName: "Nombre de connexions",
      width: 200,
      flex: 0.5,
      renderCell: ({ row }) => {
        return <span>{row.loginHistory.length}</span>;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 320,
      flex: 0.5,
      sortable: false,
      renderCell: ({ row }) => {
        return (
          <div>
            <IconButton
              variant="contained"
              size="small"
              sx={{ marginInline: 0.3 }}
              onClick={() => {
                actionsHandler("show", { state: true, payload: row });
              }}
            >
              <Eye size="20" color="var(--primary-color)" />
            </IconButton>
            <IconButton
              variant="contained"
              size="small"
              sx={{ marginInline: 0.3 }}
              onClick={() => {
                console.log("row", row);
                actionsHandler("delete", { state: true, payload: row._id });
              }}
            >
              <Trash2 size="20" color="var(--error-color)" />
            </IconButton>
            <IconButton
              variant="contained"
              size="small"
              onClick={() => {
                actionsHandler("update", {
                  state: true,
                  payload: row,
                });
              }}
            >
              <Edit size="20" color="var(--primary-color)" />
            </IconButton>
          </div>
        );
      },
    },
  ];
};
