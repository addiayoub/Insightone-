export const handleActionsError = (error, thunkAPI) => {
  console.log(error);
  if (error.response && error.response.data.message) {
    if (error.response?.status === 401) {
      return thunkAPI.rejectWithValue({
        status: 401,
        message: error.response.data.message,
      });
    }
    return thunkAPI.rejectWithValue(error.response.data.message);
  } else {
    return thunkAPI.rejectWithValue(error.message);
  }
};
