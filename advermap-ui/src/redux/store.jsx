import { configureStore } from "@reduxjs/toolkit";
import { default as notificationReducer } from "./notification";
import appSlice from "./appSlice";
import permission from "./permission";

export default configureStore({
  reducer: {
    appState: appSlice,
    notification: notificationReducer,
    permission: permission,
  },
});
