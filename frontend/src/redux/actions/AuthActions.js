import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../axios";
import axios from "axios";

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    const response = await axiosClient.post(`/api/auth/login`, user);
    const response2 = await axios.post(
      `https://192.168.11.109:9090/token/generate-token/`,
      {
        username: "consumer",
        password: "consumer",
      }
    );
    const data = await response.data;
    const apiToken = await response2.data;
    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("apiToken", apiToken);
    console.log("Api Token ", apiToken);
    return { data, apiToken };
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
    console.log("Api token", response.data);
    console.log("Api token from storage", localStorage.getItem("apiToken"));
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
