import React, { useEffect, useRef, useState } from "react";
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
import useOnClickOutside from "@/hooks/useOnClickOutside";
import ProfileButtons from "./ProfileButtons";

type ContextProfileLayout = {
  data: {
    userInfo: any;
    relationShip: {
      isYourFriend: boolean;
      isFollowedByYou: boolean;
      receivedRequest: boolean;
      sentRequest: boolean;
    };
  };
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
    data,
    isLoading: userInfoIsLoading,
    isFetching: userInfoIsFetching,
    isError: userInfoIsError,
  } = useGetUserInfoByUserEmailQuery({
    email: email || "",
  });
  const [isOwner, setIsOwner] = useState<boolean>(false);
  useEffect(() => {
    if (data && data.userInfo) {
      // console.log(data);
      setIsOwner(data.userInfo.email === currentUser.email);
    }
  }, [data]);
  const friends:
    | {
        _id: string;
        username: string;
        picture: string;
        email: string;
      }[]
    | undefined = data && data.userInfo?.friends;
  const relationship = data && data.relationShip;
  return (
    <>
      {!userInfoIsError &&
        !userInfoIsLoading &&
        !userInfoIsFetching &&
        data && (
          <>
            <div className="w-full bg-white">
              <div className="relative w-full max-w-[1094px] mx-auto mt-14">
                {/* Cover image edit */}
                <CoverImage
                  isOwner={isOwner}
                  userInfo={data.userInfo}
                  currentUser={currentUser}
                />
                {/* User info */}
                <div className="relative px-4 max-w-[1032px] mx-auto">
                  {/* User avatar */}
                  <UserImage isOwner={isOwner} userInfo={data.userInfo} />
                  {/* User info */}
                  <div className="flex flex-col gap-1 items-center pt-[100px] md:items-start md:ml-[200px] md:pt-6 min-h-[128px]">
                    <h1 className="text-3xl font-bold">
                      {data.userInfo.username}
                    </h1>
                    {data.userInfo.details.otherName && (
                      <span className="tracking-wide text-xl text-gray-500 font-semibold">
                        ({data.userInfo.details.otherName})
                      </span>
                    )}
                    {friends && friends.length > 0 && (
                      // _id username picture email
                      <>
                        <span className="text-[#65676B] font-medium -mt-1 mb-2">
                          {friends.length} friends
                        </span>
                        <div className="flex">
                          {friends.length <= 6 &&
                            friends.slice(0, 6).map((friend) => {
                              return (
                                <div
                                  key={friend._id}
                                  className="relative w-8 h-8 border-[2px] border-solid border-white rounded-full cursor-pointer -ml-[8px] overflow-hidden"
                                >
                                  <img
                                    src={friend.picture}
                                    alt=""
                                    className={`w-full h-full object-cover`}
                                  />
                                </div>
                              );
                            })}
                          {friends.length > 6 && (
                            <div className="relative w-8 h-8 border-[2px] border-solid border-white rounded-full cursor-pointer -ml-[8px] overflow-hidden">
                              <img
                                src={friends[6].picture}
                                alt=""
                                className={`w-full h-full object-cover`}
                              />
                              <div className="absolute inset-0 flex justify-center items-center z-[9] bg-gray-800 opacity-80">
                                <Dots fill="gray" width="16" height="16" />
                              </div>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                    {(!friends || friends.length === 0) && (
                      <span className="px-3 tracking-wide text-lg text-gray-500 font-semibold">
                        No friends available
                      </span>
                    )}
                  </div>
                  {/* Buttons */}
                  <ProfileButtons
                    isOwner={isOwner}
                    relationship={relationship}
                  />
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
                data,
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
