import { configureStore } from "@reduxjs/toolkit";
import { default as tokenReducer } from "./useToken";
import { default as currentPageReducer } from "./currentPage";
import { default as notificationReducer } from "./notification";

export default configureStore({
  reducer: {
    token: tokenReducer,
    currentPage: currentPageReducer,
    notification: notificationReducer,
  },
});
