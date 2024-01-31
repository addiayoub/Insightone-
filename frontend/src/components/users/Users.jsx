import { Box, Button, IconButton, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Add, Edit, Trash } from "iconsax-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/actions/UserActions";
import { logout } from "../../redux/slices/AuthSlice";
import { notyf } from "../../utils/notyf";
import resetStates from "../../utils/resetStates";
import Create from "./crud/Create";
import Delete from "./crud/Delete";
import Update from "./crud/Update";

function Users() {
  const { users, loading } = useSelector((state) => state.user);
  const { darkTheme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  // Create
  const [open, setOpen] = useState(false);
  const setModalOff = () => setOpen(false);
  const setModalOn = () => setOpen(true);
  // Edit
  const [openEdit, setOpenEdit] = useState({
    state: false,
    payload: null,
  });
  const setModalEditOff = () =>
    setOpenEdit({
      state: false,
      payload: null,
    });
  const setModalEditOn = (user) =>
    setOpenEdit({
      state: true,
      payload: user,
    });
  // Delete
  const [openDelete, setOpenDelete] = useState({ state: false, payload: null });
  const setModalDeleteOff = () => setOpenDelete(false);
  const setModalDeleteOn = () => setOpenDelete(true);
  useEffect(() => {
    dispatch(fetchUsers())
      .unwrap()
      .then((successValue) => {
        console.log("fetch users successValue: ", successValue);
      })
      .catch((rejectedValue) => {
        if (rejectedValue.status) {
          dispatch(logout());
        }
        // notyf.error(rejectedValue);
      });
  }, [dispatch]);

  const columns = [
    {
      field: "username",
      headerName: "Nom d'utilisateur",
      width: 360,
    },
    {
      field: "isAdmin",
      headerName: "Rôle",
      width: 360,
      renderCell: (params) => {
        const role = params.value ? "admin" : "user";
        return <span>{role}</span>;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 320,
      sortable: false,
      renderCell: ({ row }) => {
        return (
          <div>
            <IconButton
              variant="contained"
              size="small"
              sx={{ marginInline: 0.3 }}
              onClick={() => {
                setOpenDelete({ state: true, payload: row._id });
              }}
            >
              <Trash size="20" color="#ee4658" />
            </IconButton>
            <IconButton
              variant="contained"
              size="small"
              onClick={() => {
                setOpenEdit({
                  state: true,
                  payload: row,
                });
              }}
            >
              <Edit size="20" color="#444ce7" />
            </IconButton>
          </div>
        );
      },
    },
  ];
  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        variant="h4"
        component="h4"
        sx={{ textAlign: "center", mt: 3, mb: 3 }}
      >
        Gérer les utilisateurs
      </Typography>
      <Button
        variant="contained"
        sx={{ margin: 1 }}
        size="small"
        onClick={() => {
          setOpen(true);
        }}
      >
        <Add size={20} color="#fff" />
        ajouter un utilisateur
      </Button>
      <DataGrid
        columns={columns}
        rows={users}
        getRowId={(row) => row._id}
        disableRowSelectionOnClick
        loading={loading}
        localeText={{
          noRowsLabel: "Aucune donnée à afficher",
          noResultsOverlayLabel: "Aucun résultat trouvé",
        }}
        componentsProps={{
          pagination: {
            labelRowsPerPage: "Lignes par page:",
          },
        }}
        pageSizeOptions={[5, 25, 100]}
        initialState={{
          pagination: { paginationModel: { pageSize: 25 } },
        }}
      />
      {/* Modals */}
      <Create
        open={open}
        setModalOff={setModalOff}
        setModalOn={setModalOn}
        theme={darkTheme}
      />
      {openDelete.payload && (
        <Delete
          open={openDelete.state}
          id={openDelete.payload}
          setModalOff={setModalDeleteOff}
          setModalOn={setModalDeleteOn}
        />
      )}
      {openEdit.payload && (
        <Update
          theme={darkTheme}
          open={openEdit.state}
          userData={openEdit.payload}
          setModalOff={setModalEditOff}
          setModalOn={setModalEditOn}
        />
      )}
    </Box>
  );
}

export default Users;
