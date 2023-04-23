import React from "react";
import { useContextFriendsLayout } from "@/layouts/FriendsLayout/FriendsLayout";
import FriendCard from "./FriendCard";

type Props = {};

const Friends = (props: Props) => {
  const { friends, setFriends } = useContextFriendsLayout();
  return (
    <>
      <div className="w-full">
        <h1 className="mb-4 text-2xl font-bold">Friends</h1>
        {friends && friends.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-2 mb-5">
            {friends.map((friend) => {
              return (
                <FriendCard
                  human={friend}
                  type="friends"
                  humans={friends}
                  setHumans={setFriends}
                />
              );
            })}
          </div>
        )}
        {(!friends || friends.length === 0) && (
          <div className="flex justify-center py-3 text-xl font-bold text-gray-500">
            There is no friends yet!
          </div>
        )}
      </div>
    </>
  );
};

export default Friends;
