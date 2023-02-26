import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

type SliceState = { user: string };

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
  },
});

export const { login } = userSlice.actions;

export default userSlice.reducer;
