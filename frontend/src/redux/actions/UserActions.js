import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

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
  async ({ id, user }, thunkAPI) => {
    try {
      const { data } = await axios.put(`/api/users/${id}/update-infos`, user);
      console.log(`update profile action:`, data);
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

export const savePortefeuille = createAsyncThunk(
  "user/savePortefeuille",
  async ({ portefeuille }, thunkAPI) => {
    try {
      const { id } = thunkAPI.getState().auth.user;
      console.log("User auth", thunkAPI.getState().auth.user);
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

export const getPortefeuilles = createAsyncThunk(
  "user/getPortefeuilles",
  async (_, thunkAPI) => {
    try {
      const { id } = thunkAPI.getState().auth.user;
      console.log("User auth", thunkAPI.getState().auth.user);
      const response = await axios.get(`/api/users/getPortefeuilles`, {
        params: {
          id,
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
