import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SurfaceServices } from "services/surface/SurfaceService";
import {NotificationService} from "../services/notification/notificationService";

export const fetchNotifications = createAsyncThunk(
  "notification/fetch",
  // @ts-ignore

  async ({ token }, thunkApi) => {
    try {
      const res =  await NotificationService.countUnseen(token);
      return res;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const initialState = {
  count: 0,
  loading: false,
  countLoaded: false,
  error: null,
};
const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      return {
        count: action.payload,
        loading: false,
        countLoaded: true,
        error: null,
      };
    });
    builder.addCase(fetchNotifications.pending, (state, action) => {
      return {
        count: 0,
        loading: true,
        countLoaded: false,
        error: null,
      };
    });
    builder.addCase(fetchNotifications.rejected, (state, action) => {
      return {
        count: 0,
        loading: false,
        countLoaded: false,
        error: action.payload,
      };
    });
  },
});
export const {} = notificationSlice.actions;
export default notificationSlice.reducer;
