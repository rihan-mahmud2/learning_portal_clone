import { apiSlice } from "../../api/api";

export const quizeMarkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizeMark: builder.query({
      query: ({ sid, vid }) => `/quizMark?student_id=${sid}&&video_id=${vid}`,
    }),
    getQuizeMarks: builder.query({
      query: () => "/quizMark",
    }),
    addQuizeMark: builder.mutation({
      query: (data) => ({
        url: "/quizMark",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetQuizeMarkQuery,
  useGetQuizeMarksQuery,
  useEditQuizeMarkQuery,
  useAddQuizeMarkMutation,
} = quizeMarkApi;
