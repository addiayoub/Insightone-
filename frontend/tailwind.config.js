/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  important: "#root",
  theme: {
    screens: {
      phone: { max: "639px" },
      tablet: { min: "640px", max: "1023px" },
      laptop: { min: "1024px", max: "1279px" },
      desktop: { min: "1280px", max: "1535px" },
      wide: { min: "1536px" },
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        primary: "#444ce7",
        secondary: "rgb(47, 53, 161)",
        error: "#ee4658",
        warning: "#ffb744",
        success: "#21cc6d",
        muted: "#acb2b7",
        bgColor: "#1b1b1e",
        headingColor: "#ffffff",
        textButton: "white",
        textButtonLight: "#ffffff",
        cardBorderWidth: "1px",
        avwap: "#ffb744",
        chatBg: "#1a1a1c",
        sidebarRbg: "#0c0c0d",
      },
    },
  },
  plugins: [],
};
