import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

function getTokenFromStorage() {
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

const tokenSlice = createSlice({
  name: "token",

  initialState: {
    token: getTokenFromStorage(),
  },
  reducers: {
    setToken: (state, action) => {
      const decodedToken = jwtDecode(action.payload); // decode your token here

      state.token = decodedToken;
      localStorage.setItem("token", JSON.stringify(action.payload));
    },
  },
});

export const { setToken } = tokenSlice.actions;
export default tokenSlice.reducer;
