import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { default as notificationReducer } from "./notification";
import appSlice from "./appSlice";
import spaceSlice from "./spaceSlice";
import surfaceSlice from "./surfaceSlice";
import reportSlice from "./reportSlice";
import permission from "./permission";
import spaceRequestSlice from "./spaceRequestSlice";
import navSlice from "./navSlice";
import citySlice from "./citySlice";
import wardSlice from "./wardSlice";
import districtSlice from "./districtSlice";

const persistConfig = {
  key: "root", // Change this key as needed
  storage,
};

const rootReducer = combineReducers({
  appState: appSlice,
  notification: notificationReducer,
  spaces: spaceSlice,
  spaceRequest: spaceRequestSlice,
  surfaces: surfaceSlice,
  nav: navSlice,
  reports: reportSlice,
  permission: permission,
  cities: citySlice,
  wards: wardSlice,
  district: districtSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };
