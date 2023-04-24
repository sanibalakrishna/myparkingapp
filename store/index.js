import { configureStore } from "@reduxjs/toolkit";
import { bookingsSlice } from "./bookingsSlice";
import { apiSlice } from "./apiSlice";
import { userSlice } from "./userSlice";
export const store = configureStore({
  reducer: {
    bookings: bookingsSlice.reducer,
    api: apiSlice.reducer,
    user: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
