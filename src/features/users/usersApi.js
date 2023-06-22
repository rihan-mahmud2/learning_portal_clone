import { apiSlice } from "../api/api";

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (userEmail) => `/users?email=${userEmail}`,
    }),
  }),
});

export const { useGetUserQuery } = usersApi;
