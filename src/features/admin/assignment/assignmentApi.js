import { apiSlice } from "../../api/api";

export const assignmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignments: builder.query({
      query: () => "/assignments",
    }),
    getAssignment: builder.query({
      query: (id) => `/assignments/${id}`,
    }),
    getAssignmentByVideoId: builder.query({
      query: (id) => `/assignments?video_id=${id}`,
    }),
    addAssignment: builder.mutation({
      query: (data) => ({
        url: "/assignments",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const addResult = dispatch(
          assignmentApi.util.updateQueryData(
            "getAssignments",
            undefined,
            (draft) => {
              draft.push(arg);
            }
          )
        );

        try {
          await queryFulfilled;
        } catch (e) {
          addResult.undo();
        }
      },
    }),
    editAssignment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignments/${id}`,
        method: "PATCH",
        body: data,
      }),

      /// pessimistic cache update

      async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedData } = await queryFulfilled;

          dispatch(
            assignmentApi.util.updateQueryData(
              "getAssignments",
              undefined,
              (draft) => {
                const filteredData = draft.filter((item) => item.id !== id);

                return [...filteredData, updatedData];
              }
            )
          );
        } catch (e) {}
      },
    }),
    deleteAssignment: builder.mutation({
      query: (id) => ({
        url: `/assignments/${id}`,
        method: "DELETE",
      }),

      onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const deletedResult = dispatch(
          assignmentApi.util.updateQueryData(
            "getAssignments",
            undefined,
            (draft) => {
              const filteredData = draft.filter((item) => item.id !== arg);
              return [...filteredData];
            }
          )
        );
        queryFulfilled.catch(deletedResult.undo);
      },
    }),
  }),
});

export const {
  useGetAssignmentQuery,
  useGetAssignmentsQuery,
  useAddAssignmentMutation,
  useEditAssignmentMutation,
  useDeleteAssignmentMutation,
  useGetAssignmentByVideoIdQuery,
} = assignmentApi;
