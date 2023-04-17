import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { RootState } from "../store";

export const usersApi = createApi({
  reducerPath: "usersApi",
  tagTypes: ["Users", "Images"],
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
  }),
});

export const {
  useGetUserInfoByUserEmailQuery,
  useGetImagesQuery,
  useUpdateProfilePictureByEmailMutation,
  useUpdateProfileCoverByEmailMutation,
} = usersApi;
