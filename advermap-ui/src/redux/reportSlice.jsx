import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ReportService } from "services/report/ReportService";

export const fetchReports = createAsyncThunk(
  "report/fetch",
  // @ts-ignore

  async ({ params, token }, thunkApi) => {
    try {
      const res = await ReportService.getWithParams(params, token);

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
const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchReports.fulfilled, (state, action) => {
      return {
        entities: action.payload,
        loading: false,
        error: null,
      };
    });
    builder.addCase(fetchReports.pending, (state, action) => {
      return {
        entities: [],
        loading: true,
        error: null,
      };
    });
    builder.addCase(fetchReports.rejected, (state, action) => {
      return {
        entities: [],
        loading: false,
        error: action.payload,
      };
    });
  },
});
export const {} = reportSlice.actions;
export default reportSlice.reducer;
