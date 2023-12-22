import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiAuth, login } from "../redux/actions/AuthActions";
import runLogoutTimer from "../utils/runLogoutTimer";
import theme, { darkTheme, lightTheme } from "../utils/theme";
import Animation from "./animation/Animation";
import Intro from "./animation/Intro";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://idatech.ma/">
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
      .then(() => dispatch(apiAuth()))
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
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                padding: 5,
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar
                sx={{ m: 1, bgcolor: "primary.main", color: "secondary.main" }}
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
                  label="Mot de pass"
                  type="password"
                  id="password"
                  value={loginInfos.password}
                  onChange={handelChange}
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={loading}
                >
                  {loading ? "Veuillez patienter..." : "Connexion"}
                </Button>
                {error && <Alert severity="error">{error}</Alert>}
              </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Container>
        </ThemeProvider>
      )}
    </>
  );
}
