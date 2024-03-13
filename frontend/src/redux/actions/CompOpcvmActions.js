import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleActionsError } from "../../utils/handleActionsError";
import axiosClient from "../../api/axios";

export const getData = createAsyncThunk(
  "compOpcvm/getData",
  async ({ opcvm }, thunkAPI) => {
    try {
      const response = await axiosClient.get(`/composition-opcvm/`, {
        params: {
          opcvm,
        },
      });
      const response2 = await axiosClient.get(
        `/composition-opcvm/note-information`,
        {
          params: {
            opcvm,
          },
        }
      );
      console.log("Response2", response2.data);
      const data = response.data.data;

      return data;
    } catch (error) {
      return handleActionsError(error, thunkAPI);
    }
  }
);

export const getNoteInformation = createAsyncThunk(
  "compOpcvm/getNoteInformation",
  async ({ opcvm }, thunkAPI) => {
    try {
      const response = await axiosClient.get(
        `/composition-opcvm/note-information/`,
        {
          params: {
            opcvm,
          },
        }
      );
      console.log("call get pdf");
      // const data = response.data.data;
      console.log("getNoteInformation response", response);
      return response.data;
    } catch (error) {
      return handleActionsError(error, thunkAPI);
    }
  }
);
