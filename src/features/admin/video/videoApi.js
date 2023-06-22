import { apiSlice } from "../../api/api";

export const videoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => "/videos",
    }),
    getVideo: builder.query({
      query: (id) => `/videos/${id}`,
    }),
    getVideoId: builder.query({
      query: (title) => `/videos?title=${title}`,
    }),
    addVideo: builder.mutation({
      query: (data) => ({
        url: "/videos",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const addResult = dispatch(
          videoApi.util.updateQueryData("getVideos", undefined, (draft) => {
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
    editVideo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/videos/${id}`,
        method: "PATCH",
        body: data,
      }),

      async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedData } = await queryFulfilled;

          dispatch(
            videoApi.util.updateQueryData("getVideos", undefined, (draft) => {
              const filteredData = draft.filter((item) => item.id != id);

              return [...filteredData, updatedData];
            })
          );
        } catch (e) {}
      },
    }),
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),

      onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const deletedResult = dispatch(
          videoApi.util.updateQueryData("getVideos", undefined, (draft) => {
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
  useGetVideosQuery,
  useGetVideoQuery,
  useEditVideoMutation,
  useDeleteVideoMutation,
  useAddVideoMutation,
  useGetVideoIdQuery,
} = videoApi;
