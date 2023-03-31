import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Reaction } from "@/types/Reaction.type";

export const reactionsApi = createApi({
  reducerPath: "reactionsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/`,
  }),
  endpoints: (builder) => ({
    getReactionsByPostId: builder.query<Reaction[], { postId: string }>({
      query(body) {
        const { postId } = body;
        return `reactions/${postId}`;
      },
    }),
  }),
});

export const { useGetReactionsByPostIdQuery } = reactionsApi;
