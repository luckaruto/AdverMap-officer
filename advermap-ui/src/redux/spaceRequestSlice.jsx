import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SpaceService } from "services/space/SpaceService";

export const fetchSpaceRequest = createAsyncThunk(
  "space/fetchSpaces",
  // @ts-ignore

  async ({ params, token }, thunkApi) => {
    try {
      const res = await SpaceService.getRequestsWithParams(params, token);
    
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
  name: "spaceRequest",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSpaceRequest.fulfilled, (state, action) => {
      return {
        entities: action.payload,
        loading: false,
        error: null,
      };
    });
    builder.addCase(fetchSpaceRequest.pending, (state, action) => {
      return {
        entities: [],
        loading: true,
        error: null,
      };
    });
    builder.addCase(fetchSpaceRequest.rejected, (state, action) => {
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
