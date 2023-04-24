import { createSlice } from "@reduxjs/toolkit";

const tempbookings = new Array(24).fill(null);
const initialState = {
  bookings: tempbookings,
};

export const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    setBookings: (state, action) => {
      state.bookings = action.payload;
    },
    setBooking: (state, action) => {
      const id = action.payload.id;

      const tempbookingsstate = [...state.bookings];
      tempbookingsstate[id] = action.payload.booking;
      state.bookings = tempbookingsstate;
    },
  },
});
