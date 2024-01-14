import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DistrictService } from "services/district/DistrictService"; // Adjust the import path based on your project structure

export const fetchDistricts = createAsyncThunk(
    "city/fetchDistricts",
    async ({  }, thunkApi) => {
        try {
            const districts = await DistrictService.getDistricts();
            return districts;
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

const districtSlice = createSlice({
    name: "district",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchDistricts.fulfilled, (state, action) => {
            return {
              entities: action.payload,
              loading: false,
              error: null,
            };
          });
          builder.addCase(fetchDistricts.pending, (state, action) => {
            return {
              entities: [],
              loading: true,
              error: null,
            };
          });
          builder.addCase(fetchDistricts.rejected, (state, action) => {
            return {
              entities: [],
              loading: false,
              error: action.payload,
            };
          });
    },
});

export const {} = districtSlice.actions;
export default districtSlice.reducer;
