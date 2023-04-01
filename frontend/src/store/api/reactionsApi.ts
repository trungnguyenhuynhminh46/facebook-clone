import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Reaction } from "@/types/Reaction.type";
import { RootState } from "../store";

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
    getReactionsByPostId: builder.query<
      { data: Reaction[] },
      { postId: string }
    >({
      query(body) {
        const { postId } = body;
        return `reactions/${postId}`;
      },
      providesTags(result, error, body) {
        const { postId } = body;
        const reactions = result?.data;
        if (reactions && reactions.length > 0) {
          const tags = [
            ...reactions.map(({ _id }) => {
              return {
                type: "Reactions" as const,
                id: _id,
              };
            }),
            {
              type: "Reactions" as const,
              id: `post-${postId}`,
            },
          ];
          return tags;
        }
        return [
          {
            type: "Reactions" as const,
            id: `post-${postId}`,
          },
        ];
      },
    }),
    addReaction: builder.mutation<
      { data: Reaction },
      { postId?: string; commentId?: string; reaction: string }
    >({
      query(body) {
        return {
          url: "reactions",
          method: "POST",
          body,
        };
      },
      invalidatesTags(result, error, body) {
        const { postId, commentId, reaction } = body;
        if (error) {
          return [];
        }
        if (postId) {
          return [
            {
              type: "Reactions" as const,
              id: `post-${postId}`,
            },
          ];
        }
        if (commentId) {
          return [
            {
              type: "Reactions" as const,
              id: `comment-${commentId}`,
            },
          ];
        }
        return [];
      },
    }),
    updateReaction: builder.mutation<
      { data: Reaction },
      { reactionId: string; newReaction: string }
    >({
      query(body) {
        const { reactionId, newReaction } = body;
        return {
          url: `reactions/${reactionId}`,
          method: "PATCH",
          body: { newReaction },
        };
      },
      invalidatesTags(result, error, body) {
        const { reactionId } = body;
        return [
          {
            type: "Reactions" as const,
            id: reactionId,
          },
        ];
      },
    }),
    deleteReaction: builder.mutation<{ data: {} }, { reactionId: string }>({
      query(body) {
        const { reactionId } = body;
        return {
          url: `reactions/${reactionId}`,
          method: "DELETE",
        };
      },
      invalidatesTags(result, error, body) {
        const { reactionId } = body;
        return [
          {
            type: "Reactions" as const,
            id: reactionId,
          },
        ];
      },
    }),
  }),
});

export const {
  useGetReactionsByPostIdQuery,
  useAddReactionMutation,
  useUpdateReactionMutation,
  useDeleteReactionMutation,
} = reactionsApi;
