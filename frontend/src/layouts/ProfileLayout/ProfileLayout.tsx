import React, { useEffect, useState } from "react";
import { Dots, Messenger, Friends } from "@/svg";
import {
  NavLink,
  useLocation,
  useOutletContext,
  useParams,
} from "react-router-dom";
import Style from "./style.module.css";
import classNames from "classnames";
import { Outlet } from "react-router-dom";
import {
  useGetImagesQuery,
  useGetUserInfoByUserEmailQuery,
} from "@/store/api/usersApi";
import NotFound from "@/pages/NotFound";
import { isError } from "lodash";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/selectors/user";
import CoverImage from "./CoverImage";
import UserImage from "./UserImage";

type ContextProfileLayout = {
  userInfo: any;
  userInfoIsLoading: boolean;
  userInfoIsFetching: boolean;
  userInfoIsError: boolean;
  isOwner: boolean;
};

type Props = {};

const ProfileLayout = (props: Props) => {
  const currentUser = useSelector(selectCurrentUser);
  const location = useLocation();
  const list = location.pathname.split("/");
  const last = list[list.length - 1];
  const { email } = useParams();
  const {
    data: userInfo,
    isLoading: userInfoIsLoading,
    isFetching: userInfoIsFetching,
    isError: userInfoIsError,
  } = useGetUserInfoByUserEmailQuery({
    email: email || "",
  });
  const [isOwner, setIsOwner] = useState<boolean>(false);
  useEffect(() => {
    if (userInfo) {
      console.log(userInfo);
      setIsOwner(userInfo.email === currentUser.email);
    }
  }, [userInfo]);
  const hasFriends = userInfo?.friends && userInfo.friends?.length > 0;
  return (
    <>
      {!userInfoIsError &&
        !userInfoIsLoading &&
        !userInfoIsFetching &&
        userInfo && (
          <>
            <div className="w-full bg-white">
              <div className="relative w-full max-w-[1094px] mx-auto mt-14">
                {/* Cover image edit */}
                <CoverImage isOwner={isOwner} userInfo={userInfo} />
                {/* User info */}
                <div className="relative px-4 max-w-[1032px] mx-auto">
                  {/* User avatar */}
                  <UserImage isOwner={isOwner} userInfo={userInfo} />
                  {/* User info */}
                  <div className="flex flex-col gap-1 items-center pt-[100px] md:items-start md:ml-[200px] md:pt-6 h-[128px]">
                    <h1 className="text-3xl font-bold">
                      Nguyễn Huỳnh Minh Trung
                    </h1>
                    {hasFriends && (
                      <>
                        <span className="text-[#65676B] font-medium -mt-1 mb-2">
                          223 friends
                        </span>
                        <div className="flex">
                          {Array(6)
                            .fill(0)
                            .map((item, index) => {
                              return (
                                <div
                                  key={index}
                                  className="relative w-8 h-8 border-[2px] border-solid border-white rounded-full cursor-pointer -ml-[8px] overflow-hidden"
                                >
                                  <img
                                    key={index}
                                    src="https://images.unsplash.com/photo-1680905669458-8c86c74d5f97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=8"
                                    alt=""
                                    className={`w-full h-full object-cover`}
                                  />
                                </div>
                              );
                            })}
                          <div className="relative w-8 h-8 border-[2px] border-solid border-white rounded-full cursor-pointer -ml-[8px] overflow-hidden">
                            <img
                              src="https://images.unsplash.com/photo-1680905669458-8c86c74d5f97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=8"
                              alt=""
                              className={`w-full h-full object-cover`}
                            />
                            <div className="absolute inset-0 flex justify-center items-center z-[9] bg-gray-800 opacity-80">
                              <Dots fill="gray" width="16" height="16" />
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {!hasFriends && (
                      <span className="px-3 tracking-wide text-lg text-gray-500 font-semibold">
                        No friends available
                      </span>
                    )}
                  </div>
                  {/* Buttons */}
                  <div className="w-full flex gap-2 mt-5 mx-auto md:w-[160px] md:absolute md:right-4 md:mt-1 md:-translate-y-full md:flex-col lg:w-[268px] lg:flex-row">
                    {isOwner && (
                      <>
                        <button className="flex items-center justify-center gap-2 flex-grow h-9 bg-blue-600 text-white font-semibold rounded-md active:scale-95 active:bg-blue-700">
                          <span>+</span> <span>Add to story</span>
                        </button>
                        <button className="flex items-center justify-center gap-2 flex-grow h-9 rounded-md bg-gray-300 active:scale-95 active:bg-gray-300 text-black">
                          <i className="edit_icon"></i>
                          <span className="font-medium">Edit profile</span>
                        </button>
                      </>
                    )}
                    {!isOwner && (
                      <>
                        <button className="flex items-center justify-center gap-2 flex-grow h-9 rounded-md bg-gray-300 active:scale-95 active:bg-gray-300 text-black">
                          <Messenger />
                          <span className="font-semibold">Message</span>
                        </button>
                        <button className="flex items-center justify-center gap-2 flex-grow h-9 bg-blue-600 text-white font-semibold rounded-md active:scale-95 active:bg-blue-700">
                          <i className="friends_requests_icon scale-75"></i>{" "}
                          <span>Add friend</span>
                        </button>
                      </>
                    )}
                  </div>
                  {/* Navigation */}
                  <div className="flex py-1 border-t-[0.5px] border-solid border-gray-400 mt-4">
                    <NavLink
                      end
                      to={`/profile/${email || ""}`}
                      className={({ isActive }) =>
                        classNames(Style["menu-item"], {
                          [Style["active"]]: isActive || last === "grid",
                        })
                      }
                    >
                      Posts
                    </NavLink>
                    <NavLink
                      to={`/profile/${email || ""}/about`}
                      end
                      className={({ isActive }) =>
                        classNames("pointer-events-none", Style["menu-item"], {
                          [Style["active"]]: isActive,
                        })
                      }
                    >
                      About
                    </NavLink>
                    <NavLink
                      to={`/profile/${email || ""}/friends`}
                      end
                      className={({ isActive }) => {
                        return classNames(
                          "pointer-events-none",
                          Style["menu-item"],
                          {
                            [Style["active"]]: isActive,
                          }
                        );
                      }}
                    >
                      Friends
                    </NavLink>
                    <NavLink
                      to={`/profile/${email || ""}/photos`}
                      end
                      className={({ isActive }) =>
                        classNames("pointer-events-none", Style["menu-item"], {
                          [Style["active"]]: isActive,
                        })
                      }
                    >
                      Photos
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
            <Outlet
              context={{
                userInfo,
                userInfoIsLoading,
                userInfoIsFetching,
                userInfoIsError,
                isOwner,
              }}
            />
          </>
        )}
      {userInfoIsError && <NotFound />}
    </>
  );
};

export default ProfileLayout;
export const useContextProfileLayout = () => {
  return useOutletContext<ContextProfileLayout>();
};
