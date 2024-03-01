import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/actions/UserActions";
import { logout } from "../../redux/slices/AuthSlice";
import Create from "./crud/Create";
import Delete from "./crud/Delete";
import Update from "./crud/Update";
import Table from "../Table";
import MainLoader from "../loaders/MainLoader";
import { getColumns } from "./columns";
import { UserPlus } from "react-feather";

function Users() {
  const { users, loading } = useSelector((state) => state.user);
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

  const columns = getColumns(setOpenDelete, setOpenEdit);
  return (
    <Box sx={{ width: "100%" }}>
      {loading && <MainLoader />}
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
        <UserPlus size={20} color="#fff" className="mr-1" />
        ajouter un utilisateur
      </Button>
      <Table columns={columns} rows={users} pageSize={25} />
      {/* Modals */}
      {open && (
        <Create open={open} setModalOff={setModalOff} setModalOn={setModalOn} />
      )}
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
