import { Post } from "@/types/Post.type";
import { apiSlice } from "./apiSlice";

type AddPostBodyType = {
  type: "onlyText" | "cover" | "withImages" | "profilePicture" | "profileCover";
  user?: string;
  text?: string;
  coverId?: number;
  imagesList?: string[];
  isSharedTo?: string;
  isFeeling?: string;
  checkedOutAt?: string;
  tagedFriends?: string[];
};

export const postsApi = apiSlice.injectEndpoints({
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
    getPostsByEmail: builder.query<{ posts: Post[] }, { email?: string }>({
      query(body) {
        const { email } = body;
        return `/posts/getPostsByEmail/${email}`;
      },
      providesTags(result, error, body) {
        if (error || !result) {
          return [];
        }
        const { email } = body;
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
              id: `posts-${email}`,
            },
          ];
          return tags;
        }
        return [
          {
            type: "Posts",
            id: `posts-${email}`,
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
        const { user } = result;
        return [
          {
            type: "Posts",
            id: `all-posts`,
          },
          {
            type: "Posts",
            id: `posts-${user.email}`,
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
        if (error || !result) {
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
      invalidatesTags(result, error, body) {
        if (error) {
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
  }),
});

export const {
  useGetAllPostsQuery,
  useGetPostsByEmailQuery,
  useAddPostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
} = postsApi;
