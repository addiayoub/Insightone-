import { Container, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../redux/actions/UserActions";
import { updateUsername } from "../redux/slices/AuthSlice";
import { setPath } from "../redux/slices/DashboardSlice";
import { resetUpdateProfileState } from "../redux/slices/UserSlice";
import { notyf } from "../utils/notyf";
import EndAdorment from "./Ui/EndAdorment";

function Profile() {
  const { user } = useSelector((state) => state.auth);
  const { loading, error } = useSelector(
    (state) => state.user.updateProfileState
  );
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visiblePasswordConfir, setVisiblePasswordConfir] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPath("."));
    dispatch(resetUpdateProfileState());
  }, [dispatch]);
  const handelSubmit = (event) => {
    event.preventDefault();
    dispatch(
      updateProfile({
        id: user.id,
        user: {
          username,
          password,
          passwordConfirmation,
        },
      })
    )
      .unwrap()
      .then((successValue) => {
        notyf.success(successValue.message);
        dispatch(updateUsername(successValue.newUser.username));
      })
      .catch((rejectedValue) => {
        if (rejectedValue?.failed) {
          notyf.error(rejectedValue.message);
        }
        console.log("update rejectedValue:", rejectedValue);
      });
  };

  return (
    <div>
      <Container minWidth="sm">
        <h1>Profile</h1>
        <form onSubmit={handelSubmit}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          ></div>
          <br /> <br />
          <div>
            <TextField
              label="Nom d'utilisateur"
              id="username-field"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              {...((error?.usernamePassword || error?.username) && {
                error: true,
                helperText: error.usernamePassword || error?.username,
              })}
            />
            <br /> <br />
            <TextField
              id="password-field"
              type={visiblePassword ? "text" : "password"}
              label="Mot de pass"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              fullWidth
              InputProps={{
                endAdornment: (
                  <EndAdorment
                    visible={visiblePassword}
                    setVisible={setVisiblePassword}
                  />
                ),
              }}
              {...((error?.usernamePassword || error?.password) && {
                error: true,
              })}
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
              InputProps={{
                endAdornment: (
                  <EndAdorment
                    visible={visiblePasswordConfir}
                    setVisible={setVisiblePasswordConfir}
                  />
                ),
              }}
              {...((error?.usernamePassword || error?.password) && {
                error: true,
                helperText: error?.password || null,
              })}
            />
            <br /> <br />
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
    </div>
  );
}

export default Profile;
