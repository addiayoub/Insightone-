import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#444ce7", // --primary-color
    },
    secondary: {
      main: "#ffffff", // --secondary-color
    },
    text: {
      primary: "#1b1b1e", // --text-color
    },
    hover: {
      main: "#e7e9f9", // --hover-color
      contrastText: "#373736",
    },
    error: {
      main: "#ee4658", // --danger-color
    },
    success: {
      main: "#21cc6d", // --success-color
      contrastText: "#fff",
    },
    warning: {
      main: "#ffb744", // --warning-color
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#444ce7", // --primary-color
    },
    secondary: {
      main: "#fff", // --secondary-color
    },
    text: {
      primary: "#373736",
    },
    hover: {
      main: "#e7e9f9", // --hover-color
      contrastText: "#373736",
    },
    error: {
      main: "#ee4658", // --danger-color
    },
    success: {
      main: "#21cc6d", // --success-color
      contrastText: "#fff",
    },
    warning: {
      main: "#ffb744", // --warning-color
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#444ce7", // --primary-color
    },
    secondary: {
      main: "#ffffff", // --secondary-color
    },
    // text: {
    //   primary: "#fff", // --text-color
    // },
    hover: {
      main: "#e7e9f9", // --hover-color
      contrastText: "#373736",
    },
    error: {
      main: "#ee4658", // --danger-color
    },
    success: {
      main: "#2e7d32", // --success-color
      contrastText: "#fff",
    },
    warning: {
      main: "#ffb744", // --warning-color
    },
  },
});

export default theme;
