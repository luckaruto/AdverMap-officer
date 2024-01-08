import { createSlice } from "@reduxjs/toolkit";
import {NotificationService} from "../services/notification/notificationService";
import {setToken} from "./useToken";
import {setCurrentPage} from "./currentPage";
import {PAGE} from "../components/constants";
import {AxiosError} from "axios";


async function getNotificationCount(){
  try {
    var token = localStorage.getItem("token");
    if (!token) {
      return null;
    }
    token = token.replaceAll(`"`,"");
    const auth = `Bearer ${token}`;

    const res = await NotificationService.countUnseen({headers: {Authorization:auth }});

    if (res.status === 200) {
      return res.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }

  return null;
}

const notification = createSlice({
  name: "notification",

  initialState: {
    notification: await getNotificationCount(),
    needUpdateNotify: true,
  },
  reducers: {
    setNotificationCount: (state, action) => {
      state.notification = action.payload;
    },
    setNeedUpdate: (state, action) => {
      state.needUpdateNotify = action.payload;
    },
  },
});

export const { setNotificationCount, setNeedUpdateNotify } = notification.actions;
export default notification.reducer;
