import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

type SliceState = { user: {} | null };

const initialState: SliceState = {
  user: Cookies.get("user") ? JSON.parse(Cookies.get("user") || "") : null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
