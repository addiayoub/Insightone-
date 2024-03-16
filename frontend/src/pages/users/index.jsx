import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/actions/UserActions";
import { logout } from "../../redux/slices/AuthSlice";
import Create from "./crud/Create";
import Delete from "./crud/Delete";
import Update from "./crud/Update";
import { getColumns } from "./columns";
import { UserPlus } from "react-feather";
import Table from "../../components/Table";
import MainLoader from "../../components/loaders/MainLoader";
import Show from "./crud/Show";

function Users() {
  const { users, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [modals, setModals] = useState({
    create: { state: false, payload: null },
    delete: { state: false, payload: null },
    update: { state: false, payload: null },
    show: { state: false, payload: null },
  });
  const handleModals = (name, value = { state: false, payload: null }) => {
    setModals((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
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

  const columns = getColumns(handleModals);
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
        onClick={() => handleModals("create", { state: true })}
      >
        <UserPlus size={20} color="#fff" className="mr-1" />
        ajouter un utilisateur
      </Button>
      <Table columns={columns} rows={users} pageSize={25} />
      {/* Modals */}
      {modals.show.state && (
        <Show data={modals.show} setModalOff={() => handleModals("show")} />
      )}
      {modals.create.state && (
        <Create
          open={modals.create.state}
          setModalOff={() => handleModals("create")}
        />
      )}
      {modals.delete.payload && (
        <Delete
          open={modals.delete.state}
          id={modals.delete.payload}
          setModalOff={() => handleModals("delete")}
        />
      )}
      {modals.update.payload && (
        <Update
          open={modals.update.state}
          userData={modals.update.payload}
          setModalOff={() => handleModals("update")}
        />
      )}
    </Box>
  );
}

export default Users;
