import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { User } from "@/types/User.type";

type SliceState = { user: User | null };

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
    updateProfileImage: (state, action) => {
      const { profileUrl } = action.payload;
      if (state.user?.picture) {
        state.user.picture = profileUrl;
      }
    },
    updateCoverImage: (state, action) => {
      const { cover } = action.payload;
      if (state.user?.picture) {
        state.user.cover = cover;
      }
    },
    updateSavedPosts: (state, action) => {
      const { savedPosts } = action.payload;
      if (state.user?.savedPosts) {
        state.user.savedPosts = savedPosts;
      }
    },
    updateSearch: (state, action) => {
      const { newSearch } = action.payload;
      if (state.user?.search) {
        state.user.search = newSearch;
      }
    },
    updateDisplayMode: (state, action) => {
      const { newDisplayMode } = action.payload;
      if (state.user?.displayMode) {
        state.user.displayMode = newDisplayMode;
      }
    },
  },
});

export const {
  login,
  logout,
  updateProfileImage,
  updateCoverImage,
  updateSavedPosts,
  updateSearch,
  updateDisplayMode,
} = userSlice.actions;

export default userSlice.reducer;
