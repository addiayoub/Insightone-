import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axios";

export const getStats = createAsyncThunk(
  "admin/getStats",
  async (_, thunkAPI) => {
    try {
      const response = await axiosClient.get("/api/admin/stats");
      console.log("get Stats: resp", response);
      return response.data;
    } catch (error) {
      console.log("get Stats: error", error);
    }
  }
);
