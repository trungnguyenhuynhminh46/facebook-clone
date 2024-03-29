import React from "react";
import { ClipLoader } from "react-spinners";
import { Link, useParams } from "react-router-dom";

type Props = {
  userInfo: any;
  userInfoIsLoading: boolean;
  userInfoIsFetching: boolean;
  userInfoIsError: boolean;
};

const ManageFriends: React.FC<Props> = (props) => {
  const { userInfo, userInfoIsLoading, userInfoIsFetching, userInfoIsError } =
    props;
  const isSpinning = userInfoIsLoading || userInfoIsFetching;
  const thereIsNoFriends = !userInfo || userInfo?.friends?.length === 0;

  return (
    <div className="rounded-lg bg-white dark:bg-[#242526] w-full p-4 flex flex-col items-stretch gap-5">
      <div className="flex justify-between items-center -mt-2 -mr-2">
        {/* <Link to={`/profile/${email}/photos`}>Photos</Link> */}
        <Link
          to="#"
          className="text-2xl font-bold hover:underline transition-all duration-100 dark:text-[#E4E6EB]"
        >
          Friends
        </Link>
        <Link
          to="#"
          className="p-2 text-blue-500 hover--overlay relative overflow-hidden rounded-md transition-all duration-200"
        >
          See all friends
        </Link>
      </div>
      {!thereIsNoFriends && (
        <span className="-mt-6 -mb-2 text-gray-500 dark:text-[#b0b3b8]">
          {userInfo?.friends?.length} friends
        </span>
      )}
      {isSpinning && (
        <div className="flex justify-center py-2">
          <ClipLoader
            color={"gray"}
            loading={userInfoIsLoading || userInfoIsFetching}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      {!isSpinning && thereIsNoFriends && (
        <div className="flex justify-center py-2 text-xl font-bold text-gray-500">
          No friends available yet
        </div>
      )}
      {!thereIsNoFriends && !userInfoIsError && (
        <div className="grid grid-cols-3 gap-3">
          {userInfo.friends
            .slice(0, 9)
            .map(
              (friend: {
                _id: string;
                username: string;
                email: string;
                picture: string;
              }) => {
                return (
                  <div
                    key={friend._id}
                    className="w-full relative flex flex-col gap-1"
                  >
                    <Link
                      to={`/profile/${friend.email}`}
                      className="relative w-full aspect-square rounded-md overflow-hidden group"
                    >
                      <div className="hidden absolute inset-0 bg-gray-800 opacity-10 group-hover:block"></div>
                      <img
                        src={friend.picture}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </Link>
                    <Link
                      to={`/profile/${friend.email}`}
                      className="text-sm font-bold hover:underline text-left dark:text-[#E4E6EB]"
                    >
                      {friend.username}
                    </Link>
                  </div>
                );
              }
            )}
        </div>
      )}
      {userInfoIsError && (
        <span className="text-red-500">
          Something went wrong, please try again!
        </span>
      )}
    </div>
  );
};

export default ManageFriends;
