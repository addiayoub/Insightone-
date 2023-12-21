import { createSlice } from "@reduxjs/toolkit";
import { login } from "../actions/AuthActions";
import Cookies from "js-cookie";
import { setPath } from "./DashboardSlice";

const initialState = {
  loading: false,
  user: JSON.parse(localStorage.getItem("user")),
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      Cookies.remove("jwt");
    },
    updateUsername: (state, { payload }) => {
      state.user = { ...state.user, username: payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.user = null;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    });
  },
});

export const { logout, updateUsername } = authSlice.actions;
export default authSlice.reducer;
export const resetHH = () => (dispatch) => {
  // Reset other state first
  dispatch(setPath(""));
};
