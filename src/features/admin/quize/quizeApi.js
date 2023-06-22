import { apiSlice } from "../../api/api";

export const quizeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizes: builder.query({
      query: () => "/quizzes",
    }),
    getQuize: builder.query({
      query: (id) => `/quizzes/${id}`,
    }),
    getQuizeByVideoId: builder.query({
      query: (id) => `/quizzes?video_id=${id}`,
    }),
    addQuize: builder.mutation({
      query: (data) => ({
        url: "/quizzes",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const addResult = dispatch(
          quizeApi.util.updateQueryData("getQuizes", undefined, (draft) => {
            draft.push(arg);
          })
        );

        try {
          await queryFulfilled;
        } catch (e) {
          addResult.undo();
        }
      },
    }),
    editQuize: builder.mutation({
      query: ({ id, data }) => ({
        url: `/quizzes/${id}`,
        method: "PATCH",
        body: data,
      }),

      async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedData } = await queryFulfilled;

          dispatch(
            quizeApi.util.updateQueryData("getQuizes", undefined, (draft) => {
              const filteredData = draft.filter((item) => item.id != id);

              return [...filteredData, updatedData];
            })
          );
        } catch (e) {}
      },
    }),
    deleteQuize: builder.mutation({
      query: (id) => ({
        url: `/quizzes/${id}`,
        method: "DELETE",
      }),
      onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const deletedResult = dispatch(
          quizeApi.util.updateQueryData("getQuizes", undefined, (draft) => {
            const filteredData = draft.filter((item) => item.id != arg);
            return [...filteredData];
          })
        );
        queryFulfilled.catch(deletedResult.undo);
      },
    }),
  }),
});

export const {
  useAddQuizeMutation,
  useGetQuizeQuery,
  useGetQuizeByVideoIdQuery,
  useGetQuizesQuery,
  useDeleteQuizeMutation,
  useEditQuizeMutation,
} = quizeApi;
