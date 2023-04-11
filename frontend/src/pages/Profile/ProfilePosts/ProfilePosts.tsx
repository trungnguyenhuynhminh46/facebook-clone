import React from "react";
import CreatePosts from "@/components/home/CreatePosts";
import CreatePostPopUp from "@/components/home/CreatePostPopUp";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/selectors/user";
import { Outlet, useOutletContext, useParams } from "react-router-dom";
import classNames from "classnames";
import Style from "./style.module.css";
import { NavLink } from "react-router-dom";
import { useContextProfileLayout } from "@/layouts/ProfileLayout/ProfileLayout";
// Components
import ManagePostsMenu from "./ManagePostsMenu";
import IntroMenu from "./IntroMenu";
import {
  useGetImagesQuery,
  useGetUserInfoByUserEmailQuery,
} from "@/store/api/usersApi";
import ManageImagesMenu from "./ManageImagesMenu";
import ManageFriends from "./ManageFriends";

type Props = {};

const ProfilePosts = (props: Props) => {
  const { email } = useParams();
  const currentUser = useSelector(selectCurrentUser);
  const { userInfo, userInfoIsLoading, userInfoIsFetching, userInfoIsError } =
    useContextProfileLayout();
  const folder = userInfo?.email ? `${userInfo.email}/postsImages` : "";

  return (
    <div className="flex flex-col gap-[15px] mt-[15px] max-w-[1032px] px-4 mx-auto md:flex-row">
      {/* Left column */}
      <div className="w-full md:basis-2/5 flex flex-col gap-[15px]">
        <IntroMenu />
        <ManageImagesMenu folder={folder} />
        <ManageFriends
          userInfo={userInfo}
          userInfoIsLoading={userInfoIsLoading}
          userInfoIsFetching={userInfoIsFetching}
          userInfoIsError={userInfoIsError}
        />
      </div>
      {/* Right column */}
      <div className="w-full md:basis-3/5 flex flex-col gap-[15px]">
        <CreatePosts currentUser={currentUser} />
        {/* Posts grid */}
        <ManagePostsMenu />

        <Outlet />
      </div>
    </div>
  );
};

export default ProfilePosts;
