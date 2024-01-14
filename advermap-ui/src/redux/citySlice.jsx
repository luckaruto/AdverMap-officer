import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CityService } from "services/city/CityService"; // Adjust the import path based on your project structure

export const fetchCities = createAsyncThunk(
  "city/fetchCities",
  async ({}, thunkApi) => {
    try {
      console.log("fetch cities 2");
      const cities = await CityService.getCities();
      return cities;
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

const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCities.fulfilled, (state, action) => {
      return {
        entities: action.payload,
        loading: false,
        error: null,
      };
    });
    builder.addCase(fetchCities.pending, (state, action) => {
      return {
        entities: [],
        loading: true,
        error: null,
      };
    });
    builder.addCase(fetchCities.rejected, (state, action) => {
      return {
        entities: [],
        loading: false,
        error: action.payload,
      };
    });
  },
});

export const {} = citySlice.actions;
export default citySlice.reducer;
