import { ThemeProvider } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import RouterProvider from "./routes/RouterProvider";
import { darkTheme, lightTheme } from "./utils/theme";

function App() {
  const theme = useSelector((state) => state.theme);
  useEffect(() => {
    if (theme.darkTheme) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme.darkTheme]);

  useEffect(() => {
    const data = {
      Actions: [
        {
          classe: "Actions cotés",
          categorie: "ASSURANCES",
          libelle: "AFMA",
        },
        {
          classe: "Actions cotés",
          categorie: "BATIMENT & MATERIAUX DE CONSTRUCTION",
          libelle: "AFRIC INDUSTRIES SA",
        },
      ],
    };
  }, []);

  return (
    <ThemeProvider theme={theme.darkTheme ? darkTheme : lightTheme}>
      <RouterProvider />
    </ThemeProvider>
  );
}

export default App;
