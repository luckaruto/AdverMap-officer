import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SurfaceAllowanceService } from "services/surfaceAllowance/SurfaceAllowanceService";


export const fetchSurfaceAllowance = createAsyncThunk(
  "surfaceAllowance/fetchSurfaceAllowance",
  // @ts-ignore

  async ({ params, token }, thunkApi) => {
    try {
      const res = await SurfaceAllowanceService.getWithParams(params, token);
    
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
const surfaceAllowanceSlice = createSlice({
  name: "surfaceAllowance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSurfaceAllowance.fulfilled, (state, action) => {
      return {
        entities: action.payload,
        loading: false,
        error: null,
      };
    });
    builder.addCase(fetchSurfaceAllowance.pending, (state, action) => {
      return {
        entities: [],
        loading: true,
        error: null,
      };
    });
    builder.addCase(fetchSurfaceAllowance.rejected, (state, action) => {
      return {
        entities: [],
        loading: false,
        error: action.payload,
      };
    });
  },
});
export const {} = surfaceAllowanceSlice.actions;
export default surfaceAllowanceSlice.reducer;
