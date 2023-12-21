import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { grey } from "@mui/material/colors";
import * as React from "react";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../../redux/actions/UserActions";
import { notyf } from "../../../utils/notyf";

export default function Delete({ open, setModalOff, id }) {
  const dispatch = useDispatch();
  const handelDelete = async (id) => {
    try {
      dispatch(deleteUser(id))
        .unwrap()
        .then((successValue) => {
          console.log("del successValue", successValue);
          notyf.success(successValue.message);
        })
        .catch((rejectedValue) => {
          if (rejectedValue?.failed) {
            notyf.error(rejectedValue.message);
            return;
          }
          // notyf.error(rejectedValue);
          console.log("delete rejectedValue:", rejectedValue);
        });
      setModalOff();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => setModalOff()}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          Confirmation de suppression
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Êtes-vous sûr de vouloir supprimer cet utilisateur ?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ margin: "0 auto 10px" }}>
          <Button
            variant="contained"
            disableElevation
            color="hover"
            sx={{
              "&:hover": {
                bgcolor: grey[400],
              },
            }}
            onClick={() => setModalOff()}
          >
            Annuler
          </Button>
          <Button
            variant="contained"
            disableElevation
            color="error"
            onClick={() => handelDelete(id)}
            autoFocus
          >
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
