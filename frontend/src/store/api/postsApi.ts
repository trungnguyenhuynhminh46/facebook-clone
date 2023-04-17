import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { RootState } from "../store";
import { Post } from "@/types/Post.type";
// all-posts
// post-${postId}

type AddPostBodyType = {
  type: "onlyText" | "cover" | "withImages" | "profilePicture";
  user?: string;
  text?: string;
  coverId?: number;
  imagesList?: string[];
  isSharedTo?: string;
  isFeeling?: string;
  checkedOutAt?: string;
  tagedFriends?: string[];
};

export const postsApi = createApi({
  reducerPath: "postsApi",
  tagTypes: ["Posts"],
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
    getAllPosts: builder.query<{ posts: Post[] }, void>({
      query(body) {
        return `/posts/getAllPosts`;
      },
      providesTags(result, error, body) {
        if (error || !result) {
          return [];
        }
        const { posts } = result;
        if (posts && posts.length > 0) {
          const tags = [
            ...posts.map((post) => {
              return {
                type: "Posts" as const,
                id: `post-${post._id}`,
              };
            }),
            {
              type: "Posts" as const,
              id: `all-posts`,
            },
          ];
          return tags;
        }
        return [
          {
            type: "Posts",
            id: `all-posts`,
          },
        ];
      },
    }),
    addPost: builder.mutation<Post, AddPostBodyType>({
      query(body) {
        return {
          url: `/posts/createPost`,
          method: "POST",
          body,
        };
      },
      invalidatesTags(result, error, body) {
        if (error || !result) {
          return [];
        }
        return [
          {
            type: "Posts",
            id: `all-posts`,
          },
        ];
      },
    }),
    updatePost: builder.mutation<
      Post,
      { postId: string; changes: AddPostBodyType }
    >({
      query(body) {
        const { postId, changes } = body;
        return {
          url: `/posts/${postId}`,
          method: "PATCH",
          changes,
        };
      },
      invalidatesTags(result, error, body) {
        if (error || result) {
          return [];
        }
        const { postId } = body;
        return [
          {
            type: "Posts" as const,
            id: `post-${postId}`,
          },
        ];
      },
    }),
    deletePost: builder.mutation<
      null,
      {
        postId: string;
      }
    >({
      query(body) {
        const { postId } = body;
        return {
          url: `/posts/${postId}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useAddPostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
} = postsApi;
