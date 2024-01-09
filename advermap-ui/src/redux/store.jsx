import { configureStore } from "@reduxjs/toolkit";
import { default as notificationReducer } from "./notification";
import appSlice from "./appSlice";

export default configureStore({
  reducer: {
    appState: appSlice,
    notification: notificationReducer,
  },
});
