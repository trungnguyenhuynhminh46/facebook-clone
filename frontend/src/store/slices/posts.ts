import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  status: "idle",
  error: "",
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/post/getAllPosts`
  );
  // This value is saved in state.payload
  return response.data.posts;
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Adding date and reactions
        let min = 1;
      });
  },
});

export const {} = postsSlice.actions;
export default postsSlice.reducer;
