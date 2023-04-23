import React from "react";
import { useContextFriendsLayout } from "@/layouts/FriendsLayout/FriendsLayout";
import FriendCard from "./FriendCard";

type Props = {};

const SentRequests = (props: Props) => {
  const { sentRequests, setSentRequests } = useContextFriendsLayout();
  return (
    <div className="w-full">
      <h1 className="mb-4 text-2xl font-bold">Sent requests</h1>
      {sentRequests && sentRequests.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-2 mb-5">
          {sentRequests.map((sentRequest) => {
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
  );
};

export default SentRequests;
