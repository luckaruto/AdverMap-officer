import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {UserService} from "../services/user/usersService";

export const fetchUser = createAsyncThunk(
  "user/fetchUsers",
  // @ts-ignore

  async ({ params, token }, thunkApi) => {
    try {
      const res = await UserService.fetchWithParams(params, token);
    
      return res;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const initialState = {
  entities: [],
  loading: false,
  error: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      return {
        entities: action.payload,
        loading: false,
        error: null,
      };
    });
    builder.addCase(fetchUser.pending, (state, action) => {
      return {
        entities: [],
        loading: true,
        error: null,
      };
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      return {
        entities: [],
        loading: false,
        error: action.payload,
      };
    });
  },
});
export const {} = userSlice.actions;
export default userSlice.reducer;
