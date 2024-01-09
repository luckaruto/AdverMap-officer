import { configureStore } from "@reduxjs/toolkit";
import { default as tokenReducer } from "./useToken";
import { default as notificationReducer } from "./notification";
import appSlice from "./appSlice";

export default configureStore({
  reducer: {
    token: tokenReducer,
    appState: appSlice,
    notification: notificationReducer,
  },
});
