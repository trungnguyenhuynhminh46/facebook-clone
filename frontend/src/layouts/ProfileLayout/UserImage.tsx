import React, { useState } from "react";
import ChangeAvatar from "@layouts/ProfileLayout/ChangeAvatar";

type Props = {
  isOwner: boolean;
  userInfo: any;
};

const UserImage: React.FC<Props> = ({ isOwner, userInfo }) => {
  const [showPopUp, setShowPopUp] = useState<boolean>(false);
  return (
    <>
      {/* Change Avatar Pop up */}
      {showPopUp && (
        <ChangeAvatar userInfo={userInfo} setShowPopUp={setShowPopUp} />
      )}
      {/* User image */}
      <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-0 md:-top-8 md:left-6 md:translate-x-0 md:translate-y-0 w-[168px] h-[168px] rounded-full overflow-hidden border-[4px] border-solid border-white bg-white hover--overlay cursor-pointer">
        <img
          src={
            userInfo.picture ||
            "https://res.cloudinary.com/dbrd0cias/image/upload/v1676961543/default_user_sofrta.png"
          }
          alt=""
          className="w-full rounded-full h-full object-cover border-[2px] border-solid border-gray-200"
        />
      </div>
      {/* Camera button */}
      {isOwner && (
        <div
          className="absolute right-1/2 translate-x-[80px] top-3 translate-y-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300 flex justify-center items-center cursor-pointer md:top-[72px] md:-left-4 md:right-auto md:translate-x-[160px] active:scale-95"
          onClick={() => {
            setShowPopUp(!showPopUp);
          }}
        >
          <i className="camera_filled_icon"></i>
        </div>
      )}
    </>
  );
};

export default UserImage;
