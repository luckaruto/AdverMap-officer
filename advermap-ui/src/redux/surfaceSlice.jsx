import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SurfaceServices } from "services/surface/SurfaceService";

export const fetchSurfaces = createAsyncThunk(
  "surface/fetch",
  // @ts-ignore

  async ({ params, token }, thunkApi) => {
    try {
      const res = await SurfaceServices.getWithParams(params, token);

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
const surfaceSlice = createSlice({
  name: "surface",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSurfaces.fulfilled, (state, action) => {
      return {
        entities: action.payload,
        loading: false,
        error: null,
      };
    });
    builder.addCase(fetchSurfaces.pending, (state, action) => {
      return {
        entities: [],
        loading: true,
        error: null,
      };
    });
    builder.addCase(fetchSurfaces.rejected, (state, action) => {
      return {
        entities: [],
        loading: false,
        error: action.payload,
      };
    });
  },
});
export const {} = surfaceSlice.actions;
export default surfaceSlice.reducer;
