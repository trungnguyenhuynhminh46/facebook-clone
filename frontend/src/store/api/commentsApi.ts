import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { RootState } from "../store";
import { Comment } from "@/types/Comment.type";

export const commentsApi = createApi({
  reducerPath: "commentsApi",
  tagTypes: ["Comments"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.user?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    },
  }),
  endpoints: (builders) => ({
    getRootCommentsByPostId: builders.query<Comment[], { postId: string }>({
      query(body) {
        const { postId } = body;
        return `/comments/root/${postId}`;
      },
      providesTags(result, error, body) {
        const { postId } = body;
        if (result && result.length > 0) {
          const tags = [
            ...result.map((comment) => {
              return {
                type: "Commments" as const,
                id: `root-comment-${comment._id}`,
              };
            }),
            {
              type: "Comments" as const,
              id: `LIST-root-comment-${postId}`,
            },
          ];
        }
        return [
          {
            type: "Comments",
            id: `LIST-root-comment-${postId}`,
          },
        ];
      },
    }),
    getCommentsByParentComment: builders.query<
      Comment[],
      { commentId: string }
    >({
      query(body) {
        const { commentId } = body;
        return `/comments/children/${commentId}`;
      },
      providesTags(result, error, body) {
        const { commentId } = body;
        if (result && result.length > 0) {
          const tags = [
            ...result.map((comment) => {
              return {
                type: "Comments" as const,
                id: `children-comment-${comment._id}`,
              };
            }),
            {
              type: "Comments" as const,
              id: `LIST-chidlren-comment-${commentId}`,
            },
          ];
        }
        return [
          {
            type: "Comments",
            id: `LIST-children-comment-${commentId}`,
          },
        ];
      },
    }),
    addComment: builders.mutation<
      Comment,
      {
        userId: string;
        text: string;
        image: string;
        postId: string;
        parentId?: string;
      }
    >({
      query(body) {
        return {
          url: `/comments`,
          method: "POST",
          body,
        };
      },
      invalidatesTags(result, error, body) {
        const { postId, parentId } = body;
        if (error || !result) {
          return [];
        }
        if (parentId) {
          return [
            {
              type: "Comments",
              id: `LIST-chidlren-comment-${parentId}`,
            },
          ];
        }
        return [
          {
            type: "Comments",
            id: `LIST-root-comment-${postId}`,
          },
        ];
      },
    }),
    updateComment: builders.mutation<
      Comment,
      {
        commentId: string;
        userId: string;
        text: string;
        image: string;
        postId: string;
        parentId?: string;
      }
    >({
      query(body) {
        const { commentId, ...rest } = body;
        return {
          url: `/comments/${commentId}`,
          method: "patch",
          body: rest,
        };
      },
      invalidatesTags(result, error, body) {
        const { commentId } = body;
        if (error || !result) {
          return [];
        }
        return [
          {
            type: "Comments",
            id: result.parrentComment
              ? `children-comment-${commentId}`
              : `root-comment-${commentId}`,
          },
        ];
      },
    }),
    deleteComment: builders.mutation<
      { parentComment?: string },
      { commentId: string }
    >({
      query(body) {
        const { commentId } = body;
        return {
          url: `/comments/${commentId}`,
          method: "DELETE",
          body,
        };
      },
      invalidatesTags(result, error, body) {
        const { commentId } = body;
        if (error || !result) {
          return [];
        }
        const { parentComment } = result;
        if (parentComment) {
          return [
            {
              type: "Comments",
              id: `children-comment-${commentId}`,
            },
          ];
        }
        return [
          {
            type: "Comments",
            id: `root-comment-${commentId}`,
          },
        ];
      },
    }),
  }),
});
