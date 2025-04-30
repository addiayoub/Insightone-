import { createSlice } from "@reduxjs/toolkit";
import { login } from "../actions/AuthActions";
import Cookies from "js-cookie";
import { setPath } from "./DashboardSlice";

const initialState = {
  loading: false,
  user: JSON.parse(localStorage.getItem("user")),
  error: null,
  apiToken: localStorage.getItem("apiToken"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("apiToken");
      Cookies.remove("jwt");
    },
    updateCurrentUser: (state, { payload }) => {
      const { username, pic } = payload;
      state.user = { ...state.user, username, pic };
      localStorage.setItem("user", JSON.stringify(state.user));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.user = null;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload.data;
      state.apiToken = payload.apiToken;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.apiToken = null;
      state.error = action.payload;
    });
  },
});

export const { logout, updateCurrentUser } = authSlice.actions;
export default authSlice.reducer;
