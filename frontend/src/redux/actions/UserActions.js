import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`/api/users/`);
      const { users } = await response.data;
      return users;
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

export const storeUser = createAsyncThunk(
  "user/storeUser",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post("/api/users/", user);
      return response.data;
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      } else {
        console.log("error.message", error.message);
        return thunkAPI.rejectWithValue({
          failed: true,
          message: error.message,
        });
      }
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUSer",
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.delete(`/api/users/${id}`);
      console.log(`delete action:`, { id, ...data });
      return { id, ...data };
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      } else {
        return thunkAPI.rejectWithValue({
          failed: true,
          message: error.message,
        });
      }
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, user }, thunkAPI) => {
    try {
      const { data } = await axios.put(`/api/users/${id}`, user);
      console.log(`update action:`, data);
      return data;
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      } else {
        return thunkAPI.rejectWithValue({
          failed: true,
          message: error.message,
        });
      }
    }
  }
);

export const showUser = createAsyncThunk(
  "user/showUser",
  async ({ username }, thunkAPI) => {
    try {
      const response = await axios.get(`/api/users/${username}`);
      console.log(`show action:`, response);
      return response.data.user;
    } catch (error) {
      // return custom error message from backend if present
      console.log(`show action error:`, error.response);
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async ({ user }, thunkAPI) => {
    try {
      console.log("update pr user", user);
      let formData = new FormData();
      formData.append("pic", user.pic);
      formData.append("username", user.username);
      formData.append("password", user.password);
      formData.append("passwordConfirmation", user.passwordConfirmation);
      const { data } = await axios.put(`/api/users/update-infos`, formData);
      console.log(`update profile action:`, data);
      return data;
    } catch (error) {
      // return custom error message from backend if present
      console.log("error", error);
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      } else {
        return thunkAPI.rejectWithValue({
          failed: true,
          message: error?.message,
        });
      }
    }
  }
);

export const savePortefeuille = createAsyncThunk(
  "user/savePortefeuille",
  async ({ portefeuille }, thunkAPI) => {
    try {
      const { id } = thunkAPI.getState().auth.user;
      console.log("User auth", thunkAPI.getState().auth.user, portefeuille);
      const response = await axios.post(`/api/users/savePortefeuille`, {
        id,
        portefeuille,
      });
      console.log(`savePortefeuille`, response);
      return response.data;
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      } else {
        return thunkAPI.rejectWithValue({
          failed: true,
          message: error.message,
        });
      }
    }
  }
);
export const uploadCsv = createAsyncThunk(
  "user/uploadCsv",
  async ({ file, ptfName, ptfType, noHeaders }, thunkAPI) => {
    try {
      // Send the file to the server directly in the request body
      const formData = new FormData();
      formData.append("file", file);
      formData.append("ptfName", ptfName);
      formData.append("ptfType", ptfType);
      formData.append("noHeaders", noHeaders);
      console.log("filename", ptfName);
      console.log("noHeaders", noHeaders);
      const response = await axios.post("/api/users/uploadCSV", formData);

      // Handle the response as needed
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Error uploading file:", error);
      return thunkAPI.rejectWithValue({
        message: error.response.data.message,
        data: error.response.data.invalidTitres ?? [],
      });
    }
  }
);

export const uploadTable = createAsyncThunk(
  "user/uploadTable",
  async ({ data, ptfName, ptfType, noHeaders = true }, thunkAPI) => {
    try {
      console.log("filename", ptfName);
      console.log("noHeaders", noHeaders);
      const response = await axios.post("/api/users/uploadTable", {
        data,
        ptfName,
        ptfType,
        noHeaders,
      });

      // Handle the response as needed
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Error uploading file:", error);
      return thunkAPI.rejectWithValue({
        message: error.response.data.message,
        data: error.response.data.invalidTitres ?? [],
      });
    }
  }
);

export const getPortefeuilles = createAsyncThunk(
  "user/getPortefeuilles",
  async ({ type }, thunkAPI) => {
    try {
      const { id } = thunkAPI.getState().auth.user;
      console.log("User auth", thunkAPI.getState().auth.user);
      const response = await axios.get(`/api/users/getPortefeuilles`, {
        params: {
          id,
          type,
        },
      });
      console.log(`getPortefeuilles`, response);
      return response.data.portefeuilles;
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      } else {
        return thunkAPI.rejectWithValue({
          failed: true,
          message: error.message,
        });
      }
    }
  }
);

export const comparePortefeuilles = createAsyncThunk(
  "user/comparePortefeuilles",
  async ({ type, titres }, thunkAPI) => {
    try {
      const { id } = thunkAPI.getState().auth.user;
      console.log("User auth", thunkAPI.getState().auth.user);
      const response = await axios.get(`/api/users/comparePortefeuilles`, {
        params: {
          id,
          type,
          titres,
        },
      });
      console.log(`comparePortefeuilles`, response);
      return response.data.portefeuilles;
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      } else {
        return thunkAPI.rejectWithValue({
          failed: true,
          message: error.message,
        });
      }
    }
  }
);

export const deletePortefeuilles = createAsyncThunk(
  "user/deletePortefeuilles",
  async ({ ptfs }, thunkAPI) => {
    try {
      const { id } = thunkAPI.getState().auth.user;
      console.log("User auth", thunkAPI.getState().auth.user);
      const response = await axios.post(
        `/api/users/deletePortefeuilles`,
        ptfs,
        {
          params: {
            id,
          },
        }
      );
      console.log(`deletePortefeuilles`, response);
      return response.data;
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      } else {
        return thunkAPI.rejectWithValue({
          failed: true,
          message: error.message,
        });
      }
    }
  }
);

export const updatePortefeuilles = createAsyncThunk(
  "user/updatePortefeuilles",
  async ({ ptfs }, thunkAPI) => {
    try {
      const { id } = thunkAPI.getState().auth.user;
      const { selectedPtf } = thunkAPI.getState().backtest;
      const response = await axios.post(
        `/api/users/updatePortefeuilles`,
        ptfs,
        {
          params: {
            id,
            ptfName: selectedPtf,
          },
        }
      );
      console.log(`updatePortefeuilles`, response);
      return response.data;
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      } else {
        return thunkAPI.rejectWithValue({
          failed: true,
          message: error.message,
        });
      }
    }
  }
);
