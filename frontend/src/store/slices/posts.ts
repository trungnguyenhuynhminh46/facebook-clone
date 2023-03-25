import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { Post } from "@/types/Post";
import { RootState } from "../store";

const postsAdapter = createEntityAdapter<Post>({
  selectId: (post) => post._id,
  sortComparer: (post1, post2) =>
    post2.createdAt.localeCompare(post1.createdAt),
});

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (token: string) => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/posts/getAllPosts`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(data);
    return data.posts;
  }
);

const initialState = postsAdapter.getInitialState({
  //'idle' | 'loading' | 'succeeded' | 'failed'
  status: "idle",
  error: "",
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        postsAdapter.addMany(state, action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "";
      });
  },
});

export const { selectEntities: selectAllPosts, selectById: selectPostById } =
  postsAdapter.getSelectors<RootState>((state) => state.posts);
export const {} = postsSlice.actions;
export default postsSlice.reducer;
