import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  permission: {
    role: '',
    cities: []
  },
  currentCity: {},
  currentDistricts: [],
  currentWards: [],
  loading: true
};

const permission = createSlice({
  name: "permission",
  initialState,
  reducers: {
    setPermission: (state, action) => {
      state.permission = action.payload;
    },
    setCurrentCity: (state, action) => {
      state.currentCity = action.payload;
    },
    setCurrentDistricts: (state, action) => {
      state.currentDistricts = action.payload;
    },
    setCurrentWards: (state, action) => {
      state.currentWards = action.payload;
    },
    setPermissionLoading: (state, action) => {
      state.loading = action.payload;
    },

  },
});

export const {
  setPermission,
  setCurrentCity,
  setCurrentDistricts,
  setCurrentWards,
  setPermissionLoading,
} = permission.actions;
export default permission.reducer;
