import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import EndAdorment from "../../../components/Ui/EndAdorment";
import ToggleButtons from "../../../components/ToggleButtons";

const style = {
  width: "100%",
  maxWidth: "400px",
  padding: "10px 0",
  borderRadius: "20px",
};

const buttons = [
  {
    label: "user_role",
    text: "Sélectionnez le rôle :",
    values: [
      {
        text: "Admin",
        value: true,
      },
      {
        text: "User",
        value: false,
      },
    ],
  },
];

const Form = (props) => {
  const {
    handelSubmit,
    username,
    setUsername,
    password,
    setPassword,
    passwordConfirmation,
    setPasswordConfirmation,
    isAdmin,
    setIsAdmin,
    error,
    loading,
    submitBtn,
  } = props;
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visiblePasswordConfir, setVisiblePasswordConfir] = useState(false);
  return (
    <Box component="form" onSubmit={handelSubmit} sx={{ ...style }}>
      <Box>
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
          {...((error?.usernamePassword || error?.password) && {
            error: true,
          })}
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
        <Box className="flex flex-wrap items-center gap-[10px]">
          <FormLabel id="radio-buttons-group-label">
            Sélectionnez le rôle :
          </FormLabel>
          {buttons.map(({ label, text, values }) => {
            return (
              <ToggleButtons
                key={label}
                buttons={values}
                init={isAdmin}
                label={label}
                onButtonsChange={(label, newValue) =>
                  setIsAdmin(newValue ?? false)
                }
              />
            );
          })}
        </Box>
        <br />
        {submitBtn && submitBtn}
      </Box>
    </Box>
  );
};

export default Form;
