import {
  useAcceptRequestMutation,
  useDeclineRequestMutation,
  useToggleFriendRequestMutation,
  useUnfriendMutation,
} from "@/store/api/usersApi";
import { selectCurrentUser } from "@/store/selectors/user";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

type Friend = {
  _id: string;
  username: string;
  email: string;
  picture: string;
};

type Props = {
  human: Friend & { friends: Friend[] };
  type: "friends" | "received" | "sent";
  humans:
    | (Friend & {
        friends: Friend[];
      })[]
    | undefined;
  setHumans: React.Dispatch<
    React.SetStateAction<
      | (Friend & {
          friends: Friend[];
        })[]
      | undefined
    >
  >;
  _friends?:
    | (Friend & {
        friends: Friend[];
      })[]
    | undefined;
  _setFriends?: React.Dispatch<
    React.SetStateAction<
      | (Friend & {
          friends: Friend[];
        })[]
      | undefined
    >
  >;
};

const FriendCard: React.FC<Props> = ({
  human,
  type,
  humans,
  setHumans,
  _friends,
  _setFriends,
}) => {
  const currentUser = useSelector(selectCurrentUser);
  const [acceptRequest, { isLoading: acceptRequestIsLoading }] =
    useAcceptRequestMutation();
  const [declineRequest, { isLoading: declineRequestIsLoading }] =
    useDeclineRequestMutation();
  const [toggleFriend, { isLoading: toggleFriendIsLoading }] =
    useToggleFriendRequestMutation();
  const [friends, setFriends] = useState<Friend[] | undefined>(human?.friends);
  if (!human) {
    return null;
  }
  const handleConfirmRequest = async () => {
    if (acceptRequestIsLoading || declineRequestIsLoading) {
      return;
    }
    try {
      const response = await acceptRequest({
        id: human._id,
        email: currentUser.email,
      }).unwrap();
      if (response === "OK") {
        //   Remove from received list
        const newHumanList = humans?.filter((h) => {
          return h._id !== human._id;
        });
        setHumans(newHumanList);
        // Add to friendlist
        _setFriends && _friends && _setFriends([..._friends, human]);
      }
    } catch (err: any) {
      console.log(err);
    }
  };
  const handleDeleteRequest = async () => {
    if (acceptRequestIsLoading || declineRequestIsLoading) {
      return;
    }
    try {
      const response = await declineRequest({ id: human._id }).unwrap();
      if (response === "OK") {
        //   Remove from received list
        const newHumanList = humans?.filter((h) => {
          return h._id !== human._id;
        });
        setHumans(newHumanList);
      }
    } catch (err: any) {
      console.log(err);
    }
  };
  const handleCancelRequest = async () => {
    if (toggleFriendIsLoading) {
      return;
    }
    try {
      const response = await toggleFriend({ id: human._id }).unwrap();
      if (response === "send" || response === "cancel") {
        //   Remove from sent list
        const newHumanList = humans?.filter((h) => {
          return h._id !== human._id;
        });
        setHumans(newHumanList);
      }
    } catch (err: any) {
      console.log(err);
    }
  };
  return (
    <div className="border border-solid border-gray-300 dark:border-[#3E4042] rounded-lg bg-white dark:bg-[#242526] overflow-hidden">
      <Link to={`/profile/${human.email}`}>
        <img
          src={human.picture}
          alt=""
          className="w-full aspect-square object-cover"
        />
      </Link>
      <div className="p-3">
        {/* Name */}
        <Link
          to={`/profile/${human.email}`}
          className="block font-semibold hover:underline dark:text-[#E4E6EB]"
        >
          {human.username}
        </Link>
        {/* Friends */}
        <div className="flex items-center gap-2 h-6 mb-1">
          {friends && friends.length > 0 && (
            <>
              <div className="flex">
                {friends.map((friend) => {
                  return (
                    <div className="w-5 h-5 rounded-full overflow-hidden border border-solid border-white -ml-1">
                      <img src={friend.picture} alt="" />
                    </div>
                  );
                })}
              </div>
              {/*  */}
              <span className="font-light hover:underline text-gray-600 dark:text-[#b0b3b8] cursor-pointer">
                {friends.length} mutual friends
              </span>
            </>
          )}
        </div>
        {/* Buttons */}
        <div className="flex flex-col gap-2">
          {type === "sent" && (
            <>
              <button
                className="btn-blue"
                onClick={async () => {
                  await handleCancelRequest();
                }}
              >
                Cancel request
              </button>
            </>
          )}
          {type === "received" && (
            <>
              <button
                className="btn-blue"
                onClick={async () => {
                  await handleConfirmRequest();
                }}
              >
                Confirm
              </button>
              <button
                className="btn-gray"
                onClick={async () => {
                  await handleDeleteRequest();
                }}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendCard;
