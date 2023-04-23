import React from "react";
import { useContextFriendsLayout } from "@/layouts/FriendsLayout/FriendsLayout";
import FriendCard from "@/pages/Friends/FriendCard";
import { Link } from "react-router-dom";

type Props = {};

const FriendsHome = (props: Props) => {
  const {
    friends,
    setFriends,
    receivedRequests,
    setReceivedRequests,
    sentRequests,
    setSentRequests,
  } = useContextFriendsLayout();
  return (
    <>
      <div className="relative w-full">
        <Link
          to="/friends/friends"
          className="text-blue-500 italic absolute top-0 right-0 md:right-5 md:text-lg"
        >
          See all
        </Link>
        <h1 className="mb-4 text-2xl font-bold">Friends</h1>
        {friends && friends.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-2 mb-5">
            {friends.slice(0, 10).map((friend) => {
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
      <div className="relative w-full">
        <Link
          to="/friends/received"
          className="text-blue-500 italic absolute top-0 right-0 md:right-5 md:text-lg"
        >
          See all
        </Link>
        <h1 className="mb-4 text-2xl font-bold">Received requests</h1>
        {receivedRequests && receivedRequests.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-2 mb-5">
            {receivedRequests.slice(0, 10).map((receivedRequest) => {
              return (
                <FriendCard
                  human={receivedRequest}
                  type="received"
                  humans={receivedRequests}
                  setHumans={setReceivedRequests}
                  _friends={friends}
                  _setFriends={setFriends}
                />
              );
            })}
          </div>
        )}
        {(!receivedRequests || receivedRequests.length === 0) && (
          <div className="flex justify-center py-3 text-xl font-bold text-gray-500">
            There is no received request!
          </div>
        )}
      </div>
      <div className="relative w-full">
        <Link
          to="/friends/sent"
          className="text-blue-500 italic absolute top-0 right-0 md:right-5 md:text-lg"
        >
          See all
        </Link>
        <h1 className="mb-4 text-2xl font-bold">Sent requests</h1>
        {sentRequests && sentRequests.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-2 mb-5">
            {sentRequests.slice(0, 10).map((sentRequest) => {
              return (
                <FriendCard
                  human={sentRequest}
                  type="sent"
                  humans={sentRequests}
                  setHumans={setSentRequests}
                />
              );
            })}
          </div>
        )}
        {(!sentRequests || sentRequests.length === 0) && (
          <div className="flex justify-center py-3 text-xl font-bold text-gray-500">
            There is no sent request!
          </div>
        )}
      </div>
    </>
  );
};

export default FriendsHome;
