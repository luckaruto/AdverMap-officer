import { createSlice } from "@reduxjs/toolkit";
import { PAGE } from "../components/constants";

const initialState = {
  currentPage: PAGE.HOME,
  loading: true,
  notification: [{ id: 1, message: "test notification" }],
};

const isNotiEqual = (noti, id) => {
  return noti.id == id;
};

const appSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    addNoti: (state, action) => {
      state.notification.push(action.payload);
    },
    deleteNoti: (state, action) => {
      const id = action.payload;
      state.notification = state.notification.filter(
        (noti) => !isNotiEqual(noti, id)
      );
    },
  },
});

export const { setCurrentPage, setLoading, addNoti, deleteNoti } =
  appSlice.actions;
export default appSlice.reducer;
