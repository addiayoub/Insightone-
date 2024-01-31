import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../axios";

export const getSectorialData = createAsyncThunk(
  "analyseSectorial/getSectorialData",
  async ({ dateDebut, dateFin }, thunkAPI) => {
    try {
      const response = await axiosClient.get(`/sectorial/`, {
        params: { dateDebut, dateFin },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        if (error.response.status === 401) {
          return thunkAPI.rejectWithValue({
            status: 401,
            message: error.response.data.message,
          });
        }
        return thunkAPI.rejectWithValue(error.response.data.message);
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);
