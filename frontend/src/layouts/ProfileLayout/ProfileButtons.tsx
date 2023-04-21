import useOnClickOutside from "@/hooks/useOnClickOutside";
import { Messenger } from "@/svg";
import React, { useRef, useState } from "react";

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
};

const ProfileButtons: React.FC<Props> = ({ isOwner, relationship }) => {
  const button = useRef<HTMLButtonElement>(null);
  const [showRespondMenu, setShowRespondMenu] = useState<boolean>(false);
  const [showFriendMenu, setShowFriendMenu] = useState<boolean>(false);
  useOnClickOutside(button, () => {
    setShowRespondMenu(false);
    setShowFriendMenu(false);
  });
  return (
    <div className="w-full flex gap-2 mt-5 mx-auto md:max-w-[350px] md:absolute md:right-4 md:mt-1 md:-translate-y-full md:flex-col lg:max-w-[350px] lg:flex-row">
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
          {/* Request is sent */}
          {relationship && relationship.sentRequest && (
            <button className="flex items-center justify-center gap-2 flex-grow h-9 bg-blue-600 text-white font-semibold rounded-md active:scale-95 active:bg-blue-700">
              <img src="/icons/cancelRequest.png" className="invert" alt="" />{" "}
              <span>Cancel request</span>
            </button>
          )}
          {/* Request is received */}
          {relationship && relationship.receivedRequest && (
            <button
              ref={button}
              className="flex items-center justify-center gap-2 flex-grow h-9 bg-blue-600 text-white font-semibold rounded-md active:scale-95 active:bg-blue-700 active:z-10 relative"
              onClick={() => {
                setShowRespondMenu(!showRespondMenu);
              }}
            >
              <img src="/icons/friends.png" alt="" className="invert" />{" "}
              <span>Response</span>
              {showRespondMenu && (
                <div className="absolute left-0 top-0 z-10 translate-x-1/2 translate-y-11 md:translate-x-0 bg-white rounded-lg shadow2 p-2 flex flex-col gap-2 w-[300px]">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 ease-linear text-left text-gray-900">
                    Confirm
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 ease-linear text-left text-gray-900">
                    Delete Request
                  </button>
                </div>
              )}
            </button>
          )}
          {/* Is Friend */}
          {relationship && relationship.isYourFriend && (
            <button
              ref={button}
              className="flex items-center justify-center gap-2 flex-grow h-9 bg-blue-600 text-white font-semibold rounded-md active:scale-95 active:bg-blue-700 active:z-10 relative"
              onClick={() => {
                setShowFriendMenu(!showFriendMenu);
              }}
            >
              <img src="/icons/friends.png" className="invert" alt="" />
              <span>Friends</span>
              {showFriendMenu && (
                <div className="absolute left-0 top-0 z-10 translate-x-1/2 translate-y-11 md:translate-x-0 bg-white rounded-lg shadow2 p-2 flex flex-col gap-2 w-[300px]">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 ease-linear text-left text-gray-900 flex gap-2 items-center">
                    <img src="/icons/unfollowOutlined.png" alt="" />
                    {true && <span>Unfollow</span>}
                    {false && <span>Follow</span>}
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 ease-linear text-left text-gray-900 flex gap-2 items-center">
                    <i className="unfriend_outlined_icon"></i>
                    <span>Unfriend</span>
                  </button>
                </div>
              )}
            </button>
          )}
          {/* Is not friend */}
          {relationship &&
            !relationship.isYourFriend &&
            !relationship.receivedRequest &&
            !relationship.sentRequest && (
              <button className="flex items-center justify-center gap-2 flex-grow h-9 bg-blue-600 text-white font-semibold rounded-md active:scale-95 active:bg-blue-700 active:z-10 relative">
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
