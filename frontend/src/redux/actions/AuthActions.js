import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    const response = await axios.post(`/api/auth/login`, user);
    const data = await response.data;
    localStorage.setItem("user", JSON.stringify(data));
    return data;
  } catch (error) {
    // return custom error message from backend if present
    if (error.response && error.response.data.message) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    } else {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
});
