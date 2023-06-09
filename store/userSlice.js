import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = { user: null };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      if (action.payload != undefined) {
        state.user = action.payload;
        console.log(state.user);
      } else {
        state.user = null;
      }
    },
    userLogout: (state) => {
      state.user = null;
    },
  },
});
