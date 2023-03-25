import { configureStore } from "@reduxjs/toolkit";
// Reducers
import userReducer from "./slices/user";
import postReducer from "./slices/posts";

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
