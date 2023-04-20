import { Post } from "@/types/Post.type";
import { apiSlice } from "./apiSlice";
import { EntityState, createEntityAdapter } from "@reduxjs/toolkit";

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

const itemsAdapter = createEntityAdapter({
  selectId: (item: Post) => item._id,
  sortComparer: (a, b) => {
    return b.createdAt.localeCompare(a.createdAt);
  },
});

const itemsSelectors = itemsAdapter.getSelectors();

export const postsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPostsForHomePage: builder.query<
      { postsEntityState: EntityState<Post>; count: number },
      { _page: number; _limit: number }
    >({
      query(body) {
        const { _page, _limit } = body;
        return `/posts/getPostsForHomePage?_page=${_page}&_limit=${_limit}`;
      },
      transformResponse: (response: { posts: Post[]; count: number }) => {
        const postsEntityState = itemsAdapter.addMany(
          itemsAdapter.getInitialState(),
          response.posts
        );
        return { postsEntityState, count: response.count };
      },
      // If _page change --> refetch
      forceRefetch: ({ currentArg, previousArg }) => {
        return currentArg?._page !== previousArg?._page;
      },
      // If return string change --> clear old cache and refetch
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return endpointName;
      },
      merge: (currenState, incomingState) => {
        itemsAdapter.addMany(
          currenState.postsEntityState,
          itemsSelectors.selectAll(incomingState.postsEntityState)
        );
      },
    }),
    getPostsByEmail: builder.query<
      { postsEntityState: EntityState<Post>; count: number },
      { email?: string; _page: number; _limit: number }
    >({
      query(body) {
        const { _page, _limit, email } = body;
        return `/posts/getPostsByEmail/${email}?_page=${_page}&_limit=${_limit}`;
      },
      transformResponse: (response: { posts: Post[]; count: number }) => {
        const postsEntityState = itemsAdapter.addMany(
          itemsAdapter.getInitialState(),
          response.posts
        );
        return { postsEntityState, count: response.count };
      },
      // If _page change --> refetch
      forceRefetch: ({ currentArg, previousArg }) => {
        return (
          currentArg?._page !== previousArg?._page ||
          currentArg?.email !== previousArg?.email
        );
      },
      // If return string change --> clear old cache and refetch
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}-${queryArgs.email}`;
      },
      merge: (currenState, incomingState) => {
        itemsAdapter.addMany(
          currenState.postsEntityState,
          itemsSelectors.selectAll(incomingState.postsEntityState)
        );
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
      // Pessimistic Updates
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          const { data: addedPost } = await queryFulfilled;
          dispatch(
            postsApi.util.updateQueryData(
              "getPostsForHomePage",
              { _page: 1, _limit: 1 },
              (draft) => {
                itemsAdapter.setAll(draft.postsEntityState, [
                  addedPost,
                  ...itemsSelectors.selectAll(draft.postsEntityState),
                ]);
              }
            )
          );
          dispatch(
            postsApi.util.updateQueryData(
              "getPostsByEmail",
              { email: addedPost.user.email, _page: 1, _limit: 1 },
              (draft) => {
                itemsAdapter.setAll(draft.postsEntityState, [
                  addedPost,
                  ...itemsSelectors.selectAll(draft.postsEntityState),
                ]);
              }
            )
          );
        } catch {}
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
      // Pessimistic Updates
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedPost } = await queryFulfilled;
          dispatch(
            postsApi.util.updateQueryData(
              "getPostsForHomePage",
              { _page: 1, _limit: 1 },
              (draft) => {
                itemsAdapter.upsertOne(draft.postsEntityState, updatedPost);
              }
            )
          );
          dispatch(
            postsApi.util.updateQueryData(
              "getPostsByEmail",
              { email: updatedPost.user.email, _page: 1, _limit: 1 },
              (draft) => {
                itemsAdapter.upsertOne(draft.postsEntityState, updatedPost);
              }
            )
          );
        } catch {}
      },
    }),
    deletePost: builder.mutation<
      { email: string },
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
      // Pessimistic Updates
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          const { postId } = body;
          const { data } = await queryFulfilled;
          // console.log(data);
          dispatch(
            postsApi.util.updateQueryData(
              "getPostsForHomePage",
              { _page: 1, _limit: 1 },
              (draft) => {
                itemsAdapter.removeOne(draft.postsEntityState, postId);
              }
            )
          );
          dispatch(
            postsApi.util.updateQueryData(
              "getPostsByEmail",
              { email: data?.email, _page: 1, _limit: 1 },
              (draft) => {
                itemsAdapter.removeOne(draft.postsEntityState, postId);
              }
            )
          );
        } catch {}
      },
    }),
  }),
});

export const {
  useGetPostsByEmailQuery,
  useGetPostsForHomePageQuery,
  useAddPostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
} = postsApi;

export { itemsSelectors, itemsAdapter };
