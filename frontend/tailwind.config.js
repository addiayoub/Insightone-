/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  important: "#root",
  theme: {
    extend: {
      colors: {
        primary: "#444ce7",
        secondary: "rgb(47, 53, 161)",
        warning: "#ee4658",
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
