import { configureStore } from "@reduxjs/toolkit";
// Reducers
import userReducer from "./slices/user";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
