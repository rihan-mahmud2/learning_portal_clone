import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  video: {},
};

export const videoSlice = createSlice({
  name: "videoSlice",
  initialState,
  reducers: {
    addVideo: (state, action) => {
      state.video = action.payload;
    },
  },
});

export default videoSlice.reducer;
export const { addVideo } = videoSlice.actions;
