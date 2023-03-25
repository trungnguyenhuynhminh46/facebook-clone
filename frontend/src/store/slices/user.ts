import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { User } from "@/types/User";

type SliceState = User | null;

const initialState: SliceState = Cookies.get("user")
  ? JSON.parse(Cookies.get("user") || "")
  : null;
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state = action.payload;
    },
    logout: (state) => {
      state = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
