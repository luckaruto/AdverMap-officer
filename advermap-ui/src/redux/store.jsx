import { configureStore } from "@reduxjs/toolkit";
import { default as notificationReducer } from "./notification";
import appSlice from "./appSlice";
import spaceSlice from "./spaceSlice";
import surfaceSlice from "./surfaceSlice";
import reportSlice from "./reportSlice";

export default configureStore({
  reducer: {
    appState: appSlice,
    notification: notificationReducer,
    spaces:spaceSlice,
    surfaces:surfaceSlice,
    reports:reportSlice,
  },
});
