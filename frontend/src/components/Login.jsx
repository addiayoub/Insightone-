import React, { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
  CssBaseline,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { apiAuth, login } from "../redux/actions/AuthActions";
import Logo from "../assets/images/Logo.png";
import runLogoutTimer from "../utils/runLogoutTimer";
import theme, { darkTheme, lightTheme } from "../utils/theme";
import Intro from "./animation/Intro";
import EndAdorment from "./Ui/EndAdorment";
import { LogIn } from "react-feather";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://idatech.ma/" target="_blank">
        ID&A TECH
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn() {
  const [loginInfos, setLoginInfos] = useState({ username: "", password: "" });
  const { loading, error } = useSelector((state) => state.auth);
  const { darkTheme: darkMode } = useSelector((state) => state.theme);
  const [isVisible, setIsVisible] = useState(false);
  const handelChange = (e) => {
    const { name, value } = e.target;
    setLoginInfos({
      ...loginInfos,
      [name]: value,
    });
  };
  const dispatch = useDispatch();
  const handelSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginInfos))
      .unwrap()
      .then((successValue) => {
        // runLogoutTimer(successValue.expiresIn);
        console.log(successValue);
      })
      // .then(() => dispatch(apiAuth()))
      .catch((rejectedValue) => {
        console.log(rejectedValue);
      });
  };

  const [isHide, setIsHide] = useState(true);

  return (
    <>
      {isHide ? (
        <Intro setIsHide={setIsHide} />
      ) : (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <Container component="main" maxWidth="md">
            <CssBaseline />
            <Box
              className="flex items-center justify-between gap-12 phone:flex-col"
              sx={{
                marginTop: 8,
                padding: 5,
              }}
            >
              <Box className="max-w-[50%] flex items-center justify-center phone:max-w-[80%]">
                <img src={Logo} className="w-full" />
              </Box>
              <Box
                sx={{
                  borderRadius: "8px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar
                  sx={{
                    m: 1,
                    bgcolor: "primary.main",
                    color: "secondary.main",
                  }}
                >
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Se connecter
                </Typography>
                <Box
                  component="form"
                  onSubmit={handelSubmit}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Nom d'utilisateur"
                    name="username"
                    autoComplete="username"
                    value={loginInfos.username}
                    onChange={handelChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Mot de passe"
                    type={isVisible ? "text" : "password"}
                    id="password"
                    value={loginInfos.password}
                    InputProps={{
                      endAdornment: (
                        <EndAdorment
                          visible={isVisible}
                          setVisible={setIsVisible}
                        />
                      ),
                    }}
                    onChange={handelChange}
                    autoComplete="current-password"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={loading}
                    className="flex flex-wrap gap-2 items-center"
                  >
                    {loading ? (
                      "Veuillez patienter..."
                    ) : (
                      <>
                        <span>Connexion</span> <LogIn size={20} />
                      </>
                    )}
                  </Button>
                  {error && <Alert severity="error">{error}</Alert>}
                </Box>
              </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Container>
        </ThemeProvider>
      )}
    </>
  );
}
