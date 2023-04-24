import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://myparkingbackend.vercel.app/";

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getBookings: builder.query({
      query: () => "booking",
    }),
    loginUser: builder.mutation({
      query: (user) => ({
        url: "user/login",
        method: "POST",
        body: user,
      }),
    }),
    signupUser: builder.mutation({
      query: (user) => ({
        url: "user/signup",
        method: "POST",
        body: user,
      }),
    }),
    getProfile: builder.query({
      query: (token) => ({
        url: "user/profile",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }),
    }),
    bookParking: builder.mutation({
      query: ({ bookingdetails, token }) => ({
        url: "booking",
        method: "POST",
        body: bookingdetails,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetBookingsQuery,
  useBookParkingMutation,
  useGetProfileQuery,
  useSignupUserMutation,
  useLoginUserMutation,
} = apiSlice;
