import { apiSlice } from "./apiSlice";
import { Details } from "@/types/Details";

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserInfoByUserEmail: builder.query<any, { email: string }>({
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
  }),
});

export const {
  useGetUserInfoByUserEmailQuery,
  useGetImagesQuery,
  useUpdateProfilePictureByEmailMutation,
  useUpdateProfileCoverByEmailMutation,
  useUpdateProfileDetailsByEmailMutation,
} = usersApi;
