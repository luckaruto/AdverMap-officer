import { configureStore } from "@reduxjs/toolkit";
import { default as notificationReducer } from "./notification";
import appSlice from "./appSlice";
import spaceSlice from "./spaceSlice";
import surfaceSlice from "./surfaceSlice";
import reportSlice from "./reportSlice";
import permission from "./permission";
import spaceRequestSlice from "./spaceRequestSlice";

export default configureStore({
  reducer: {
    appState: appSlice,
    notification: notificationReducer,
    spaces:spaceSlice,
    spaceRequest:spaceRequestSlice,
    surfaces:surfaceSlice,
    reports:reportSlice,
    permission: permission,
  },
});
