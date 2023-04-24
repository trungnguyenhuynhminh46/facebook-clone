import { apiSlice } from "./apiSlice";
import { Details } from "@/types/Details";

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserInfoByUserEmail: builder.query<
      {
        userInfo: any;
        relationship: {
          isYourFriend: boolean;
          isFollowedByYou: boolean;
          receivedRequest: boolean;
          sentRequest: boolean;
        };
      },
      { email: string }
    >({
      query(body) {
        const { email } = body;
        return `/user/getUserInfoByUserEmail/${email}`;
      },
      providesTags(result, error, body) {
        if (error || !result) {
          return [];
        }
        const { email } = body;
        return [
          {
            type: "Users",
            id: `user-${email}`,
          },
        ];
      },
    }),
    getImages: builder.query<
      { total_count: number; imagesUrl: string[] },
      { folder: string; sort: string; max: number }
    >({
      query(body) {
        const { folder, sort, max } = body;
        return {
          url: `/upload/getImages`,
          method: "POST",
          body: { folder, sort, max },
        };
      },
      providesTags(result, error, body) {
        if (error || !result) {
          return [];
        }
        const { folder } = body;
        return [
          {
            type: "Images",
            id: `image-${folder}`,
          },
        ];
      },
    }),
    getFriendsPageData: builder.query<
      {
        friends: any;
        receivedRequests: any;
        sentRequests: any;
      },
      void
    >({
      query(body) {
        return `/user/getFriendsPageData`;
      },
    }),
    updateProfilePictureByEmail: builder.mutation<
      { email: string; currentProfilePicture: string },
      { email: string; pictureUrl: string }
    >({
      query(body) {
        return {
          url: `/user/updateProfilePicture`,
          method: "POST",
          body,
        };
      },
      invalidatesTags(result, error, body) {
        const { email } = body;
        if (error || !result) {
          return [];
        }
        return [
          {
            type: "Users",
            id: `user-${email}`,
          },
        ];
      },
    }),
    updateProfileCoverByEmail: builder.mutation<
      { email: string; currentCoverPicture: string },
      { email: string; cover: string }
    >({
      query(body) {
        return {
          url: `/user/updateProfileCover`,
          method: "POST",
          body,
        };
      },
      invalidatesTags(result, error, body) {
        const { email } = body;
        if (error || !result) {
          return [];
        }
        return [
          {
            type: "Users",
            id: `user-${email}`,
          },
        ];
      },
    }),
    updateProfileDetailsByEmail: builder.mutation<
      { email: string; newDetails: Details },
      { email: string; details: Details }
    >({
      query(body) {
        return {
          url: `/user/updateProfileDetails`,
          method: "PATCH",
          body,
        };
      },
    }),
    toggleFriendRequest: builder.mutation<string, { id: string }>({
      query(body) {
        const { id } = body;
        return {
          url: `/user/toggleFriendRequest/${id}`,
          method: "PATCH",
        };
      },
    }),
    acceptRequest: builder.mutation<string, { id: string; email: string }>({
      query(body) {
        const { id } = body;
        return {
          url: `/user/acceptRequest/${id}`,
          method: "PATCH",
        };
      },
      invalidatesTags(result, error, body) {
        const { email } = body;
        return [
          {
            type: "Users",
            id: `user-${email}`,
          },
        ];
      },
    }),
    declineRequest: builder.mutation<string, { id: string }>({
      query(body) {
        const { id } = body;
        return {
          url: `/user/declineRequest/${id}`,
          method: "PATCH",
        };
      },
    }),
    toggleFollow: builder.mutation<
      string,
      {
        id: string;
      }
    >({
      query(body) {
        const { id } = body;
        return {
          url: `/user/toggleFollow/${id}`,
          method: "PATCH",
        };
      },
    }),
    unfriend: builder.mutation<
      string,
      {
        id: string;
        email: string;
      }
    >({
      query(body) {
        const { id } = body;
        return {
          url: `/user/unfriend/${id}`,
          method: "PATCH",
        };
      },
      invalidatesTags(result, error, body) {
        const { email } = body;
        return [
          {
            type: "Users",
            id: `user-${email}`,
          },
        ];
      },
    }),
    toggleSavePost: builder.mutation<
      {
        savedPosts: {
          post: string;
          savedAt: Date;
        }[];
      },
      { postId: string }
    >({
      query(body) {
        const { postId } = body;
        return {
          url: `/user/toggleSavePost/${postId}`,
          method: "POST",
        };
      },
    }),
  }),
});

export const {
  useGetUserInfoByUserEmailQuery,
  useGetImagesQuery,
  useGetFriendsPageDataQuery,
  useUpdateProfilePictureByEmailMutation,
  useUpdateProfileCoverByEmailMutation,
  useUpdateProfileDetailsByEmailMutation,
  useToggleFriendRequestMutation,
  useAcceptRequestMutation,
  useDeclineRequestMutation,
  useToggleFollowMutation,
  useUnfriendMutation,
  useToggleSavePostMutation,
} = usersApi;
