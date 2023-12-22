import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../axios";
import axios from "axios";

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    const response = await axiosClient.post(`/api/auth/login`, user);
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

export const apiAuth = createAsyncThunk("auth/apiAuth", async (_, thunkAPI) => {
  try {
    const response = await axios.post(
      `https://192.168.11.109:9090/token/generate-token/`,
      {
        username: "consumer",
        password: "consumer",
      }
    );
    localStorage.setItem("apiToken", response.data);
    return response.data;
  } catch (error) {
    // return custom error message from backend if present
    if (error.response && error.response.data.message) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    } else {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
});