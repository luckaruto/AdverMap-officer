import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SurfaceServices } from "services/surface/SurfaceService";

export const fetchSurfaceRequest = createAsyncThunk(
  "surface/fetchSurfaces",
  // @ts-ignore

  async ({ params, token }, thunkApi) => {
    try {
      const res = await SurfaceServices.getRequestsWithParams(params, token);

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
const spaceSlice = createSlice({
  name: "surfaceRequest",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSurfaceRequest.fulfilled, (state, action) => {
      return {
        entities: action.payload,
        loading: false,
        error: null,
      };
    });
    builder.addCase(fetchSurfaceRequest.pending, (state, action) => {
      return {
        entities: [],
        loading: true,
        error: null,
      };
    });
    builder.addCase(fetchSurfaceRequest.rejected, (state, action) => {
      return {
        entities: [],
        loading: false,
        error: action.payload,
      };
    });
  },
});
export const {} = spaceSlice.actions;
export default spaceSlice.reducer;
