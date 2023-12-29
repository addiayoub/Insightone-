import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { memo } from "react";
import { Save } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { savePortefeuille } from "../redux/actions/UserActions";
import { notyf } from "../utils/notyf";
import ModalComponent from "./Modal";

const SavePortefeuille = ({ data, type, field }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const { params } =
    type === "OPCVM"
      ? useSelector((state) => state.opcvm)
      : useSelector((state) => state.rapport);
  const dispatch = useDispatch();
  const handleSave = () => {
    console.log("Title", title);
    console.log("params", params);
    const portefeuille = {
      name: title.trim(),
      type,
      field,
      params,
      data,
    };
    console.log("portefeuille", portefeuille);

    dispatch(savePortefeuille({ portefeuille }))
      .unwrap()
      .then(({ message }) => {
        reset();
        notyf.success(message);
      })
      .catch((error) => notyf.error(error));
    // .finally(() => reset());
  };
  const reset = () => {
    setOpen(false);
    setTitle("");
  };
  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <span>Enregistrer</span>
        <Save />
      </Button>
      <ModalComponent open={open} handleClose={reset}>
        <Box>
          <Typography variant="h6" mb={3}>
            Enregister un portefeuille
          </Typography>
        </Box>
        <Divider />
        <Box
          sx={{
            height: "250px",
            width: "400px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            mt: 3,
          }}
        >
          <TextField
            id="portefeuille-titre"
            label="Titre du portefeuille"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
          />
          <Box
            sx={{
              alignSelf: "end",
            }}
          >
            <Button
              variant="contained"
              color="error"
              sx={{
                margin: "0 10px",
              }}
              onClick={reset}
            >
              Annuler
            </Button>
            <Button variant="contained" onClick={handleSave} disabled={!title}>
              Enregistrer
            </Button>
          </Box>
        </Box>
      </ModalComponent>
    </>
  );
};

export default memo(SavePortefeuille);
