import React, { useLayoutEffect, useRef, useState } from "react";
import CreatePosts from "@/components/home/CreatePosts";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/selectors/user";
import { Outlet, useParams } from "react-router-dom";
import { useContextProfileLayout } from "@/layouts/ProfileLayout/ProfileLayout";
// Components
import ManagePostsMenu from "./ManagePostsMenu";
import IntroMenu from "./IntroMenu";
import ManageImagesMenu from "./ManageImagesMenu";
import ManageFriends from "./ManageFriends";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { Link } from "react-router-dom";

type Props = {};

const ProfilePosts = (props: Props) => {
  const { width, height: screenHeight } = useWindowDimensions();
  const leftRef = useRef<HTMLDivElement>(null);
  const [leftHeight, setLeftHeight] = useState<number>(0);
  const handleElementResized = () => {
    if (leftRef.current && leftRef.current.offsetHeight !== leftHeight) {
      setLeftHeight(leftRef.current.offsetHeight);
    }
  };
  const resizeObserver = new ResizeObserver(handleElementResized);

  useLayoutEffect(() => {
    leftRef.current && resizeObserver.observe(leftRef.current);

    return function cleanup() {
      resizeObserver.disconnect();
    };
  }, []);

  const { email } = useParams();
  const currentUser = useSelector(selectCurrentUser);
  const {
    data,
    userInfoIsLoading,
    userInfoIsFetching,
    userInfoIsError,
    isOwner,
  } = useContextProfileLayout();
  const folder =
    data && data.userInfo?.email ? `${data.userInfo.email}/postsImages` : "";

  return (
    <div className="flex flex-col gap-[15px] mt-[15px] max-w-[1032px] px-4 mx-auto md:flex-row">
      {/* Left column */}
      <div className="w-full md:w-2/5 relative">
        <div
          className="flex flex-col gap-[15px] sticky"
          ref={leftRef}
          style={{
            top: `-${leftHeight - screenHeight}px`,
          }}
        >
          <IntroMenu isOwner={isOwner} userInfo={data.userInfo} />
          <ManageImagesMenu folder={folder} />
          <ManageFriends
            userInfo={data.userInfo}
            userInfoIsLoading={userInfoIsLoading}
            userInfoIsFetching={userInfoIsFetching}
            userInfoIsError={userInfoIsError}
          />
          <div className="text-[12px] text-[var(--color-secondary)]">
            <Link to="/">Privacy </Link>
            <span className="mr-2">. </span>
            <Link to="/">Terms </Link>
            <span className="mr-2">. </span>
            <Link to="/">Advertising </Link>
            <span className="mr-2">. </span>
            <Link to="/">
              Ad Choices <i className="ad_choices_icon"></i>{" "}
            </Link>
            <span className="mr-2">. </span>
            <Link to="/"></Link>Cookies <span>. </span>
            <Link to="/">More </Link>
            <span className="mr-2">. </span> <br />
            Meta © 2022
          </div>
        </div>
      </div>
      {/* Right column */}
      <div className="w-full md:w-3/5 flex flex-col gap-[15px]">
        {isOwner && <CreatePosts currentUser={currentUser} />}
        {/* Posts grid */}
        <ManagePostsMenu isOwner={isOwner} />

        <Outlet />
      </div>
    </div>
  );
};

export default ProfilePosts;
