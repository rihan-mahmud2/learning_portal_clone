import { apiSlice } from "../../api/api";

export const assignmentMarkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignmentMarks: builder.query({
      query: () => "/assignmentMark",
    }),
    getAssignmentMark: builder.query({
      query: ({ aId, sId }) =>
        `/assignmentMark?student_id=${sId}&&assignment_id=${aId}`,
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

export const {
  useGetAssignmentMarksQuery,
  useAddAssignmentMarksMutation,
  useGetAssignmentMarkQuery,
} = assignmentMarkApi;
