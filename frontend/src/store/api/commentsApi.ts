import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { RootState } from "../store";
import { Comment } from "@/types/Comment.type";
import { Post } from "@/types/Post.type";
// comment-{id}
// root-comments-{postID}
// comment-by-parent-{parentID}

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
  endpoints: (builder) => ({
    getRootCommentsByPostId: builder.query<Comment[], { postId: string }>({
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
                type: "Comments" as const,
                id: `comment-${comment._id}`,
              };
            }),
            {
              type: "Comments" as const,
              id: `root-comments-${postId}`,
            },
          ];
          return tags;
        }
        return [
          {
            type: "Comments",
            id: `root-comments-${postId}`,
          },
        ];
      },
    }),
    getCommentsByParentComment: builder.query<Comment[], { commentId: string }>(
      {
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
                  id: `comment-${comment._id}`,
                };
              }),
              {
                type: "Comments" as const,
                id: `comment-by-parent-${commentId}`,
              },
            ];
          }
          return [
            {
              type: "Comments",
              id: `comment-by-parent-${commentId}`,
            },
          ];
        },
      }
    ),
    getCommentByCommentId: builder.query<Comment, { commentId: string }>({
      query(body) {
        const { commentId } = body;
        return `/comments/${commentId}`;
      },
      providesTags(result, error, body) {
        const { commentId } = body;
        return [
          {
            type: "Comments",
            id: `comment-${commentId}`,
          },
        ];
      },
    }),
    commentsDetailByPostId: builder.query<
      { usernamesList: string[] },
      { postId: string }
    >({
      query(body) {
        const { postId } = body;
        return `/comments/commentsDetailByPostId/${postId}`;
      },
      providesTags(result, err, body) {
        if (err) {
          return [];
        }
        const { postId } = body;
        return [
          {
            type: "Comments",
            id: `comments-detail-${postId}`,
          },
        ];
      },
    }),
    addComment: builder.mutation<
      Post,
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
        // If there is parentId --> Fetch by parentID
        if (parentId) {
          // console.log(`comment-by-parent-${parentId}`);
          return [
            {
              type: "Comments" as const,
              id: `comment-by-parent-${parentId}`,
            },
          ];
        }
        // If there is not parentId --> Fetch by postID
        // console.log(`root-comments-${postId}`);
        return [
          {
            type: "Comments" as const,
            id: `root-comments-${postId}`,
          },
        ];
      },
    }),
    updateComment: builder.mutation<
      Post,
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
          method: "PATCH",
          body: rest,
        };
      },
      invalidatesTags(result, error, body) {
        const { commentId } = body;
        if (error || !result) {
          return [];
        }
        console.log(`comment-${commentId}`);
        return [
          {
            type: "Comments",
            id: `comment-${commentId}`,
          },
        ];
      },
    }),
    deleteComment: builder.mutation<
      { parentComment?: string; post: Post },
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
        return [
          {
            type: "Comments",
            id: `comment-${commentId}`,
          },
        ];
      },
    }),
  }),
});

export const {
  useGetCommentsByParentCommentQuery,
  useGetRootCommentsByPostIdQuery,
  useGetCommentByCommentIdQuery,
  useAddCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useCommentsDetailByPostIdQuery,
} = commentsApi;
