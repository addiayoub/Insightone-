import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    darkTheme: localStorage.getItem("darkTheme") === "true",
  },
  reducers: {
    toggleTheme: (state) => {
      state.darkTheme = !state.darkTheme;
      localStorage.setItem("darkTheme", state.darkTheme);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
