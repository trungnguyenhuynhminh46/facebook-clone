import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
// Reducers
import userReducer from "./slices/user";
import postReducer from "./slices/posts";
// Api
import { reactionsApi } from "./api/reactionsApi";
import { commentsApi } from "./api/commentsApi";
import { postsApi } from "./api/postsApi";
import { usersApi } from "./api/usersApi";

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postReducer,
    [reactionsApi.reducerPath]: reactionsApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      reactionsApi.middleware,
      commentsApi.middleware,
      postsApi.middleware,
      usersApi.middleware
    ),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
