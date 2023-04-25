import useOnClickOutside from "@/hooks/useOnClickOutside";
import { Messenger } from "@/svg";
import React, { useRef, useState } from "react";
// api mutation
import {
  useToggleFriendRequestMutation,
  useAcceptRequestMutation,
  useDeclineRequestMutation,
  useToggleFollowMutation,
  useUnfriendMutation,
} from "@/store/api/usersApi";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/selectors/user";

type Props = {
  isOwner: boolean;
  relationship:
    | {
        isYourFriend: boolean;
        isFollowedByYou: boolean;
        receivedRequest: boolean;
        sentRequest: boolean;
      }
    | undefined;
  userInfo: any;
  friends:
    | {
        _id: string;
        username: string;
        picture: string;
        email: string;
      }[]
    | undefined;
  setFriends: React.Dispatch<
    React.SetStateAction<
      | {
          _id: string;
          username: string;
          picture: string;
          email: string;
        }[]
      | undefined
    >
  >;
};

const ProfileButtons: React.FC<Props> = ({
  isOwner,
  relationship,
  userInfo,
  friends,
  setFriends,
}) => {
  const currentUser = useSelector(selectCurrentUser);
  const [toggleFriend, { isLoading: toggleFriendIsLoading }] =
    useToggleFriendRequestMutation();
  const [acceptRequest, { isLoading: acceptRequestIsLoading }] =
    useAcceptRequestMutation();
  const [declineRequest, { isLoading: declineRequestIsLoading }] =
    useDeclineRequestMutation();
  const [toggleFollow, { isLoading: toggleFollowIsLoading }] =
    useToggleFollowMutation();
  const [unfriend, { isLoading: unfriendIsLoading }] = useUnfriendMutation();
  const [localRelationship, setLocalRelationship] = useState<
    | {
        isYourFriend: boolean;
        isFollowedByYou: boolean;
        receivedRequest: boolean;
        sentRequest: boolean;
      }
    | undefined
  >(relationship);
  // console.log(localRelationship);
  const [localFollow, setLocalFollow] = useState(
    userInfo.followers.includes(currentUser.id)
  );
  const button = useRef<HTMLDivElement>(null);
  const [showRespondMenu, setShowRespondMenu] = useState<boolean>(false);
  const [showFriendMenu, setShowFriendMenu] = useState<boolean>(false);
  useOnClickOutside(button, () => {
    setShowRespondMenu(false);
    setShowFriendMenu(false);
  });
  // Handler
  const toggleFriendHandler = async () => {
    if (toggleFriendIsLoading || !localRelationship) {
      return;
    }
    try {
      // alert("OK");
      const response = await toggleFriend({ id: userInfo._id }).unwrap();
      // Update relationship
      if (response === "send") {
        setLocalRelationship({
          ...localRelationship,
          sentRequest: true,
        });
        setLocalFollow(true);
      }
      if (response === "cancel") {
        setLocalRelationship({
          ...localRelationship,
          sentRequest: false,
        });
        setLocalFollow(false);
      }
    } catch (err: any) {
      console.log(err);
    }
  };
  const cancelRequestHandler = async () => {
    if (
      acceptRequestIsLoading ||
      declineRequestIsLoading ||
      !localRelationship
    ) {
      return;
    }
    try {
      const response = await declineRequest({ id: userInfo._id }).unwrap();
      if (response === "OK") {
        // Update relationship
        setLocalRelationship({
          ...localRelationship,
          receivedRequest: false,
        });
      }
    } catch (err: any) {
      console.log(err);
    }
  };
  const acceptRequestHandler = async () => {
    if (
      acceptRequestIsLoading ||
      declineRequestIsLoading ||
      !localRelationship
    ) {
      return;
    }
    try {
      const response = await acceptRequest({
        id: userInfo._id,
        email: currentUser.email,
      }).unwrap();
      if (response === "OK") {
        // Update relationship
        setLocalRelationship({
          ...localRelationship,
          isYourFriend: true,
          receivedRequest: false,
        });
        setLocalFollow(true);
        // Update target's friends list
        const newFriend = {
          _id: currentUser.id,
          username: currentUser.username,
          picture: currentUser.picture,
          email: currentUser.email,
        };
        const newFriendsList = friends ? [...friends, newFriend] : [newFriend];
        setFriends(newFriendsList);
      }
    } catch (err: any) {
      console.log(err);
    }
  };
  const toggleFollowHandler = async () => {
    if (toggleFollowIsLoading) {
      return;
    }
    try {
      const response = await toggleFollow({ id: userInfo._id }).unwrap();
      if (response === "follow") {
        setLocalFollow(true);
      }
      if (response === "unfollow") {
        setLocalFollow(false);
      }
    } catch (err: any) {
      console.log(err);
    }
  };
  const unfriendHandler = async () => {
    if (unfriendIsLoading || !localRelationship) {
      return;
    }
    try {
      const response = await unfriend({
        id: userInfo._id,
        email: currentUser.email,
      }).unwrap();
      if (response === "OK") {
        // Update relationship
        setLocalRelationship({
          ...localRelationship,
          isYourFriend: false,
        });
        // Update friends lists
        const newFriendsList = friends
          ? friends?.slice().filter((friend) => {
              return friend._id.toString() !== currentUser.id.toString();
            })
          : [];
        setFriends(newFriendsList);
      }
    } catch (err: any) {
      console.log(err);
    }
  };
  return (
    <div className="w-full flex gap-2 mt-5 mx-auto md:max-w-[350px] md:absolute md:right-4 md:mt-1 md:-translate-y-full md:flex-col lg:max-w-[350px] lg:flex-row">
      {isOwner && (
        <>
          <button className="flex items-center justify-center gap-2 flex-grow h-9 bg-blue-600 text-white font-semibold rounded-md active:scale-95 active:bg-blue-700">
            <span>+</span> <span>Add to story</span>
          </button>
          <button className="flex items-center justify-center gap-2 flex-grow h-9 rounded-md bg-gray-300 dark:bg-[#4E4F50] active:scale-95 active:bg-gray-300 text-black">
            <i className="edit_icon dark:invert"></i>
            <span className="font-medium dark:text-[#b0b3b8]">
              Edit profile
            </span>
          </button>
        </>
      )}
      {!isOwner && (
        <>
          {/* Your request is sent  */}
          {localRelationship && localRelationship.sentRequest && (
            <button
              className="flex items-center justify-center gap-2 flex-grow h-9 bg-blue-600 text-white font-semibold rounded-md active:scale-95 active:bg-blue-700"
              onClick={async () => {
                await toggleFriendHandler();
              }}
            >
              <img src="/icons/cancelRequest.png" className="invert" alt="" />{" "}
              <span>Cancel request</span>
            </button>
          )}
          {/* your request is received */}
          {localRelationship && localRelationship.receivedRequest && (
            <div
              ref={button}
              className="btn-blue active:z-10 relative"
              onClick={() => {
                setShowRespondMenu(!showRespondMenu);
              }}
            >
              <img src="/icons/friends.png" alt="" className="invert" />{" "}
              <span>Response</span>
              {showRespondMenu && (
                <div className="absolute left-0 top-0 z-10 translate-x-1/2 translate-y-11 md:translate-x-0 bg-white rounded-lg shadow2 p-2 flex flex-col gap-2 w-[300px]">
                  <button
                    className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 ease-linear text-left text-gray-900"
                    onClick={async () => {
                      await acceptRequestHandler();
                    }}
                  >
                    Confirm
                  </button>
                  <button
                    className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 ease-linear text-left text-gray-900"
                    onClick={async () => {
                      await cancelRequestHandler();
                    }}
                  >
                    Delete Request
                  </button>
                </div>
              )}
            </div>
          )}
          {/* Is Friend */}
          {localRelationship && localRelationship.isYourFriend && (
            <div
              ref={button}
              className="btn-blue active:z-10 relative"
              onClick={() => {
                setShowFriendMenu(!showFriendMenu);
              }}
            >
              <img src="/icons/friends.png" className="invert" alt="" />
              <span>Friends</span>
              {showFriendMenu && (
                <div className="absolute left-0 top-0 z-10 translate-x-1/2 translate-y-11 md:translate-x-0 bg-white rounded-lg shadow2 p-2 flex flex-col gap-2 w-[300px]">
                  <button
                    className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 ease-linear text-left text-gray-900 flex gap-2 items-center"
                    onClick={async () => {
                      await toggleFollowHandler();
                    }}
                  >
                    <img src="/icons/unfollowOutlined.png" alt="" />
                    {localFollow && <span>Unfollow</span>}
                    {!localFollow && <span>Follow</span>}
                  </button>
                  <button
                    className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 ease-linear text-left text-gray-900 flex gap-2 items-center"
                    onClick={async () => {
                      await unfriendHandler();
                    }}
                  >
                    <i className="unfriend_outlined_icon"></i>
                    <span>Unfriend</span>
                  </button>
                </div>
              )}
            </div>
          )}
          {/* Is not friend */}
          {localRelationship &&
            !localRelationship.isYourFriend &&
            !localRelationship.receivedRequest &&
            !localRelationship.sentRequest && (
              <button
                className="flex items-center justify-center gap-2 flex-grow h-9 bg-blue-600 text-white font-semibold rounded-md active:scale-95 active:bg-blue-700 active:z-10 relative"
                onClick={async () => {
                  await toggleFriendHandler();
                }}
              >
                <img src="/icons/addFriend.png" alt="" className="invert" />
                <span>Add Friend</span>
              </button>
            )}
          <button className="flex items-center justify-center gap-2 flex-grow h-9 rounded-md bg-gray-300 active:scale-95 active:bg-gray-300 text-black">
            <Messenger />
            <span className="font-semibold">Message</span>
          </button>
        </>
      )}
    </div>
  );
};

export default ProfileButtons;
