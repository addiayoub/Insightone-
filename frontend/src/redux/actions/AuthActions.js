import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axios";

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    // Appel à votre API d'authentification qui génère déjà un JWT
    const response = await axiosClient.post(`/api/auth/login`, user);
    const data = await response.data;
    
    // Le token JWT est déjà inclus dans la réponse data (data.token)
    localStorage.setItem("user", JSON.stringify(data));
    
    return { data };
  } catch (error) {
    // return custom error message from backend if present
    if (error.response && error.response.data.message) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    } else {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
});