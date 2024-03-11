import { IconButton } from "@mui/material";
import { Edit, Trash2 } from "react-feather";
export const getColumns = (handleDelete, handleEdit) => {
  return [
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
                console.log("row", row);
                handleDelete({ state: true, payload: row._id });
              }}
            >
              <Trash2 size="20" color="var(--error-color)" />
            </IconButton>
            <IconButton
              variant="contained"
              size="small"
              onClick={() => {
                handleEdit({
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
