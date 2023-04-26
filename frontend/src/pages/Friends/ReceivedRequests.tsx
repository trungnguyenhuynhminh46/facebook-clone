import React from "react";
import { useContextFriendsLayout } from "@/layouts/FriendsLayout/FriendsLayout";
import FriendCard from "./FriendCard";

type Props = {};

const ReceivedRequests = (props: Props) => {
  const { friends, setFriends, receivedRequests, setReceivedRequests } =
    useContextFriendsLayout();
  return (
    <div className="w-full">
      <h1 className="mb-4 text-2xl font-bold dark:text-[#E4E6EB]">
        Received requests
      </h1>
      {receivedRequests && receivedRequests.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-2 mb-5">
          {receivedRequests.map((receivedRequest) => {
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
  );
};

export default ReceivedRequests;
