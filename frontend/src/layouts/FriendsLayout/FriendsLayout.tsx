import { useGetFriendsPageDataQuery } from "@/store/api/usersApi";
import React, { useEffect, useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import "./style.css";
import { NavLink } from "react-router-dom";
import classNames from "classnames";

const leftSidebarMenuItems = [
  {
    id: 0,
    icon: "friends_home_icon",
    text: "Home",
    right_arrow: false,
    to: "/friends",
  },
  {
    id: 1,
    icon: "friends_requests_icon",
    text: "Friend Requests",
    right_arrow: true,
    to: "/friends/received",
  },
  {
    id: 2,
    icon: "friends_requests_icon",
    text: "Sent Requests",
    right_arrow: true,
    to: "/friends/sent",
  },
  {
    id: 3,
    icon: "all_friends_icon",
    text: "All friends",
    right_arrow: true,
    to: "/friends/friends",
  },
  {
    id: 4,
    icon: "friends_suggestions_icon",
    text: "Suggestions",
    right_arrow: true,
  },
  {
    id: 5,
    icon: "birthdays_icon",
    text: "Birthdays",
    right_arrow: false,
  },
  {
    id: 6,
    icon: "all_friends_icon",
    text: "Custom Lists",
    right_arrow: true,
  },
];

type Props = {};

type Friend = {
  _id: string;
  username: string;
  email: string;
  picture: string;
};

type ContextFriendsLayout = {
  friends:
    | (Friend & {
        friends: Friend[];
      })[]
    | undefined;
  setFriends: React.Dispatch<
    React.SetStateAction<
      | (Friend & {
          friends: Friend[];
        })[]
      | undefined
    >
  >;
  receivedRequests:
    | (Friend & {
        friends: Friend[];
      })[]
    | undefined;
  setReceivedRequests: React.Dispatch<
    React.SetStateAction<
      | (Friend & {
          friends: Friend[];
        })[]
      | undefined
    >
  >;
  sentRequests:
    | (Friend & {
        friends: Friend[];
      })[]
    | undefined;
  setSentRequests: React.Dispatch<
    React.SetStateAction<
      | (Friend & {
          friends: Friend[];
        })[]
      | undefined
    >
  >;
};

const FriendsLayout = (props: Props) => {
  const { data, isLoading, isFetching } = useGetFriendsPageDataQuery(
    undefined,
    { refetchOnMountOrArgChange: true }
  );
  const [friends, setFriends] = useState<
    (Friend & { friends: Friend[] })[] | undefined
  >(data && data.friends);
  const [receivedRequests, setReceivedRequests] = useState<
    (Friend & { friends: Friend[] })[] | undefined
  >(data && data.receivedRequests);
  const [sentRequests, setSentRequests] = useState<
    (Friend & { friends: Friend[] })[] | undefined
  >(data && data.sentRequests);
  useEffect(() => {
    if (data) {
      setFriends(data.friends);
      setReceivedRequests(data.receivedRequests);
      setSentRequests(data.sentRequests);
    }
  }, [data]);
  return (
    <div className="relative min-h-screen mt-14 flex">
      {/* Left */}
      <div className="basis-[360px] bg-white shadow2 sticky top-14">
        <div className="p-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Friends</h1>
          <div className="circle active:scale-95 cursor-pointer">
            <i className="settings_filled_icon"></i>
          </div>
        </div>
        <div className="px-2">
          {leftSidebarMenuItems.map((item) => {
            if (!item.to) {
              return (
                <div className="menu-item" key={item.id}>
                  <div className="circle">
                    <i className={item.icon}></i>
                  </div>
                  <h2 className="font-bold">{item.text}</h2>
                  {item.right_arrow && (
                    <div className="ml-auto absolute right-[10px] top-1/2 -translate-y-1/2">
                      <i className="right_icon"></i>
                    </div>
                  )}
                </div>
              );
            }
            return (
              <NavLink
                to={item?.to}
                end
                className={({ isActive }) => {
                  return classNames("menu-item", { active: isActive });
                }}
                key={item.id}
              >
                <div className="circle">
                  <i className={item.icon}></i>
                </div>
                <h2 className="font-bold">{item.text}</h2>
                {item.right_arrow && (
                  <div className="ml-auto absolute right-[10px] top-1/2 -translate-y-1/2">
                    <i className="right_icon"></i>
                  </div>
                )}
              </NavLink>
            );
          })}
        </div>
      </div>
      {/* Right */}
      <div className="flex-1 p-9">
        <Outlet
          context={{
            friends,
            setFriends,
            receivedRequests,
            setReceivedRequests,
            sentRequests,
            setSentRequests,
          }}
        />
      </div>
    </div>
  );
};

export default FriendsLayout;
export const useContextFriendsLayout = () => {
  return useOutletContext<ContextFriendsLayout>();
};
