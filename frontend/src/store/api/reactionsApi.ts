import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Reaction } from "@/types/Reaction.type";
import { RootState } from "../store";
import { Post } from "@/types/Post.type";

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
        return `/reactions/${postId}`;
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
    getReactionByPostIdAndUserId: builder.query<Reaction, { postId: string }>({
      query(body) {
        const { postId } = body;
        return `/reactions/getReactionByPostIdAndUserId/${postId}`;
      },
      providesTags(result, error, body) {
        const { postId } = body;
        return [
          {
            type: "Reactions",
            id: `SINGLE-${postId}`,
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
  }),
});

export const {
  useHandleReactionPostMutation,
  useGetReactionsByPostIdQuery,
  useGetReactionByPostIdAndUserIdQuery,
} = reactionsApi;
