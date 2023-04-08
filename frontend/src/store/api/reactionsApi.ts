import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Reaction } from "@/types/Reaction.type";
import { RootState } from "../store";
import { Post } from "@/types/Post.type";
import { Comment } from "@/types/Comment.type";

export const reactionsApi = createApi({
  reducerPath: "reactionsApi",
  tagTypes: ["Reactions"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.user?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    },
  }),
  endpoints: (builder) => ({
    getReactionsByPostId: builder.query<Reaction[], { postId: string }>({
      query(body) {
        const { postId } = body;
        return `/reactions/getReactionsByPostId/${postId}`;
      },
      providesTags(result, error, body) {
        const { postId } = body;
        const reactions = result;
        if (reactions && reactions.length > 0) {
          const tags = [
            ...reactions.map(({ _id }) => {
              return {
                type: "Reactions" as const,
                id: `reaction ${_id}`,
              };
            }),
            {
              type: "Reactions" as const,
              id: `post-reactions-${postId}`,
            },
          ];
          return tags;
        }
        return [
          {
            type: "Reactions" as const,
            id: `post-reactions-${postId}`,
          },
        ];
      },
    }),
    getReactionsByCommentId: builder.query<Reaction[], { commentId: string }>({
      query(body) {
        const { commentId } = body;
        return `/reactions/getReactionsByCommentId/${commentId}`;
      },
      providesTags(result, error, body) {
        const { commentId } = body;
        const reactions = result;
        if (reactions && reactions.length > 0) {
          const tags = [
            ...reactions.map(({ _id }) => {
              return {
                type: "Reactions" as const,
                id: `reaction ${_id}`,
              };
            }),
            {
              type: "Reactions" as const,
              id: `comment-reactions-${commentId}`,
            },
          ];
          return tags;
        }
        return [
          {
            type: "Reactions" as const,
            id: `comment-reactions-${commentId}`,
          },
        ];
      },
    }),
    getReactionByPostIdAndUserId: builder.query<Reaction, { postId: string }>({
      query(body) {
        const { postId } = body;
        return `/reactions/getReactionByPostIdAndUserId/${postId}`;
      },
      providesTags(result, error, body) {
        if (error) {
          return [];
        }
        const { postId } = body;
        return [
          {
            type: "Reactions",
            id: `reaction-${result?._id}`,
          },
          {
            type: "Reactions",
            id: `SINGLE-${postId}`,
          },
        ];
      },
    }),
    getReactionByCommentIdAndUserId: builder.query<
      Reaction,
      { commentId: string }
    >({
      query(body) {
        const { commentId } = body;
        return `/reactions/getReactionByCommentIdAndUserId/${commentId}`;
      },
      providesTags(result, error, body) {
        const { commentId } = body;
        return [
          {
            type: "Reactions",
            id: `reaction-${result?._id}`,
          },
          {
            type: "Reactions",
            id: `SINGLE-${commentId}`,
          },
        ];
      },
    }),
    reactionDetailByCommentId: builder.query<
      { usernamesList: string[]; reactionsInfo: Record<string, number> },
      { commentId: string }
    >({
      query(body) {
        const { commentId } = body;
        return `/reactions/reactionDetailByCommentId/${commentId}`;
      },
      providesTags(result, err, body) {
        if (err) {
          return [];
        }
        const { commentId } = body;
        return [
          {
            type: "Reactions",
            id: `reactions-detail-${commentId}`,
          },
        ];
      },
    }),
    reactionDetailByPostId: builder.query<
      { usernamesList: string[]; reactionsInfo: Record<string, number> },
      { postId: string }
    >({
      query(body) {
        const { postId } = body;
        return `/reactions/reactionDetailByPostId/${postId}`;
      },
      providesTags(result, err, body) {
        if (err) {
          return [];
        }
        const { postId } = body;
        return [
          {
            type: "Reactions",
            id: `reactions-detail-${postId}`,
          },
        ];
      },
    }),
    handleReactionPost: builder.mutation<
      Post,
      { postId: string; reaction: string }
    >({
      query(body) {
        const { postId, reaction } = body;
        return {
          url: `/reactions/handleReactionPost/${postId}`,
          method: "POST",
          body: { reaction },
        };
      },
      invalidatesTags(result, error, body) {
        if (error) {
          return [];
        }
        const { postId } = body;
        return [
          {
            type: "Reactions",
            id: `SINGLE-${postId}`,
          },
        ];
      },
    }),
    handleReactionComment: builder.mutation<
      Comment,
      { commentId: string; reaction: string }
    >({
      query(body) {
        const { commentId, reaction } = body;
        return {
          url: `/reactions/handleReactionComment/${commentId}`,
          method: "POST",
          body: { reaction },
        };
      },
      invalidatesTags(result, error, body) {
        if (error) {
          return [];
        }
        const { commentId } = body;
        return [
          {
            type: "Reactions" as const,
            id: `comment-reactions-${commentId}`,
          },
        ];
      },
    }),
  }),
});

export const {
  useHandleReactionPostMutation,
  useHandleReactionCommentMutation,
  useGetReactionsByPostIdQuery,
  useGetReactionsByCommentIdQuery,
  useGetReactionByPostIdAndUserIdQuery,
  useGetReactionByCommentIdAndUserIdQuery,
  useReactionDetailByCommentIdQuery,
  useReactionDetailByPostIdQuery,
} = reactionsApi;
