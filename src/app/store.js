import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/api";
import authSlice from "../features/auth/authSlice";
import videoSlice from "../features/admin/video/videoSlice";
import quizeSlice from "../features/student/quizMark/quizMarkSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    video: videoSlice,
    quizeAndAnswer: quizeSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});
