import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { commentsApi } from "../api/commentsApi";
import { Comment } from "@/types/Comment.type";

interface Entity {
  postID: string;
  [key: string]: Comment[] | string;
}

const commentAdaper = createEntityAdapter<Entity>({
  selectId: (entity) => entity.postID,
});

const initialState = commentAdaper.getInitialState();

export const extendedCommentsApiSlice = commentsApi.injectEndpoints({
  endpoints: (builder) => ({
    getRootPosts: builder.query<Comment[], { postId: string }>({
      query(body) {
        const { postId } = body;
        return `/comments/root/${postId}`;
      },
      transformResponse: (responseData) => {
        const item = [] as Comment[];
        return item;
      },
    }),
  }),
});
