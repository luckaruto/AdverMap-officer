import { createSlice } from "@reduxjs/toolkit";
import { PAGE } from "../components/constants";
import {useDispatch, useSelector} from "react-redux";
import { jwtDecode } from "jwt-decode";

function getPayloadTokenFromStorage() {
  const tokenString = localStorage.getItem("token");
  if (!tokenString || tokenString == null) {
    return null;
  }

  try {
    const decodedToken = jwtDecode(tokenString); // decode your token here
    let currentDate = new Date();
    // JWT exp is in seconds
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      return null;
    }

    return decodedToken;
  } catch (e) {

    return null;
  }
}

function getTokenFromStorage() {
  var tokenString = localStorage.getItem("token");
  if (!tokenString || tokenString == null) {
    return null;
  }

  tokenString = tokenString.replaceAll(`"`,'');
  return tokenString;
}

function  getRefreshTokenFromStorage(){
  var tokenString = localStorage.getItem("refreshToken");
  if (!tokenString || tokenString == null) {
    return null;
  }

  tokenString = tokenString.replaceAll(`"`,'');
  return tokenString;
}

const initialState = {
  currentPage: PAGE.HOME,
  token: getTokenFromStorage(),
  tokenPayload: getPayloadTokenFromStorage(),
  refreshToken:  getRefreshTokenFromStorage(),
  loading: false,
  notification: [{ id: 1, message: "test notification" }],
  snackbar: {
    id: "",
    status: "info",
    message: "init message",
  },
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
    setToken: (state, action) => {
      const decodedToken = jwtDecode(action.payload); // decode your token here
      state.tokenPayload = decodedToken;
      state.token = action.payload;
      localStorage.setItem("token", JSON.stringify(action.payload));
    },

    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
      localStorage.setItem("refreshToken", JSON.stringify(action.payload));
    },
    setSnackbar: (state, action) => {
      const { payload } = action;
      const id = new Date().toString();
      const updateState = {
        status: payload.status,
        message: payload.message,
        id: id,
      };
      state.snackbar = updateState;
    },
  },
});

export const {
  setCurrentPage,
  setLoading,
  addNoti,
  deleteNoti,
  setToken,
  setSnackbar,
  setRefreshToken,
} = appSlice.actions;
export default appSlice.reducer;
