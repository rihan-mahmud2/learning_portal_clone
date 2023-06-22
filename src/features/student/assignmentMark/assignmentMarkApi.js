import { apiSlice } from "../../api/api";

export const assignmentMarkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignmentMarks: builder.query({
      query: () => "/assignmentMark",
    }),
    addAssignmentMarks: builder.mutation({
      query: (data) => ({
        url: "/assignmentMark",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetAssignmentMarksQuery, useAddAssignmentMarksMutation } =
  assignmentMarkApi;
