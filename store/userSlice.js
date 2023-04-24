import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = { user: null };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userlogin: (state, action) => {
      if (action.payload != undefined) {
        state.user = action.payload;
      } else {
        state.user = null;
      }
    },
    userlogout: (state) => {
      state.user = null;
    },
  },
});
