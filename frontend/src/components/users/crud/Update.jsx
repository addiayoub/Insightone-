import CloseIcon from "@mui/icons-material/Close";
import { Container, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Modal from "@mui/material/Modal";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../redux/actions/UserActions";
import { resetUpdateState } from "../../../redux/slices/UserSlice";
import { notyf } from "../../../utils/notyf";
import EndAdorment from "../../EndAdorment";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: "400px",
  boxShadow: 24,
  padding: 20,
  borderRadius: "20px",
};

export default function Update({ open, setModalOff, userData, theme }) {
  const { error, loading } = useSelector((state) => state.user.updateState);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isAdmin, setIsAdmin] = useState(null);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visiblePasswordConfir, setVisiblePasswordConfir] = useState(false);
  const background = {
    backgroundColor: theme ? "var(--bg-color)" : "#fff",
  };
  const dispatch = useDispatch();

  const resetForm = () => {
    setUsername("");
    setPassword("");
    setPasswordConfirmation("");
    setVisiblePassword(false);
    setVisiblePasswordConfir(false);
  };

  useEffect(() => {
    if (userData) {
      setUsername(userData?.username);
      setIsAdmin(userData?.isAdmin);
    }
  }, [userData]);

  const handleRadioChange = (event) => {
    setIsAdmin(event.target.value === "true");
  };

  const handelSubmit = (event) => {
    event.preventDefault();
    dispatch(
      updateUser({
        id: userData._id,
        user: {
          username,
          password,
          passwordConfirmation,
          isAdmin,
        },
      })
    )
      .unwrap()
      .then((successValue) => {
        notyf.success(successValue.message);
        handleClose();
        dispatch(resetUpdateState());
      })
      .catch((rejectedValue) => {
        if (rejectedValue?.failed) {
          notyf.error(rejectedValue.message);
        }
        console.log("update rejectedValue:", rejectedValue);
      });
  };

  const handleClose = () => {
    resetForm();
    setModalOff();
    dispatch(resetUpdateState());
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container minWidth="sm">
          <form onSubmit={handelSubmit} style={{ ...style, ...background }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">Modifier un utilisateur</Typography>
              <Button onClick={handleClose}>
                <CloseIcon color="error" />
              </Button>
            </div>
            <br /> <br />
            <div>
              <TextField
                label="Nom d'utilisateur"
                id="username-field"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                {...((error?.usernamePassword || error?.username) && {
                  error: true,
                  helperText: error.usernamePassword || error?.username,
                })}
              />
              <br /> <br />
              <TextField
                id="password-field"
                type={visiblePassword ? "text" : "password"}
                {...((error?.usernamePassword || error?.password) && {
                  error: true,
                })}
                label="Mot de pass"
                value={password}
                variant="outlined"
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <EndAdorment
                      visible={visiblePassword}
                      setVisible={setVisiblePassword}
                    />
                  ),
                }}
              />
              <br />
              <br />
              <TextField
                id="password-confirmation-field"
                type={visiblePasswordConfir ? "text" : "password"}
                label="Confirmation de mot de pass"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                variant="outlined"
                fullWidth
                {...((error?.usernamePassword || error?.password) && {
                  error: true,
                  helperText: error?.password || null,
                })}
                InputProps={{
                  endAdornment: (
                    <EndAdorment
                      visible={visiblePasswordConfir}
                      setVisible={setVisiblePasswordConfir}
                    />
                  ),
                }}
              />
              <br /> <br />
              <FormLabel id="radio-buttons-group-label">
                Sélectionnez le rôle :
              </FormLabel>
              <RadioGroup
                aria-labelledby="radio-buttons-group-label"
                defaultValue="false"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="User"
                  onChange={handleRadioChange}
                  checked={!isAdmin}
                />
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="Admin"
                  onChange={handleRadioChange}
                  checked={isAdmin}
                />
              </RadioGroup>
              <br />
              <br />
              <Button
                onClick={handelSubmit}
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading ? "Veuillez patienter..." : "Modifier"}
              </Button>
            </div>
          </form>
        </Container>
      </Modal>
    </div>
  );
}
