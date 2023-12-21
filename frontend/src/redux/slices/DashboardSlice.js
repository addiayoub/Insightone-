import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  path:window.location.pathname.split("/")[1],
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    toggleSidebar: (state, action) => {
      state.isOpen = action.payload;
    },
    setPath: (state, action) => {
      state.path = action.payload;
    },
  },
});

export const { toggleSidebar, setPath } = dashboardSlice.actions;
export default dashboardSlice.reducer;
