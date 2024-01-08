import { createSlice } from "@reduxjs/toolkit";

const notification = createSlice({
  name: "notification",

  initialState: {
    notification: 17,
  },
  reducers: {
    setNotificationCount: (state, action) => {
      state.notification = action.payload;
    },
  },
});

export const { setNotificationCount } = notification.actions;
export default notification.reducer;
