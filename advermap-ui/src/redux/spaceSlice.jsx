import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SpaceService } from "services/space/SpaceService";

export const fetchSpaces = createAsyncThunk(
  "space/fetchSpaces",
  // @ts-ignore

  async ({ params, token }, thunkApi) => {
    try {
      const res = await SpaceService.getWithParams(params, token);
    
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
  name: "space",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSpaces.fulfilled, (state, action) => {
      return {
        entities: action.payload,
        loading: false,
        error: null,
      };
    });
    builder.addCase(fetchSpaces.pending, (state, action) => {
      return {
        entities: [],
        loading: true,
        error: null,
      };
    });
    builder.addCase(fetchSpaces.rejected, (state, action) => {
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
