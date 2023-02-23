import { createSlice } from "@reduxjs/toolkit";

type SliceState = { user: string };

const initialState: SliceState = {
  user: "null",
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
