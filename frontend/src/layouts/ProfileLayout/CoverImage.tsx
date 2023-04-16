import React, { useState } from "react";

type Props = {
  isOwner: boolean;
  userInfo: any;
};

const CoverImage: React.FC<Props> = ({ isOwner, userInfo }) => {
  const [showEditCoverPhotoMenu, setShowEditCoverPhotoMenu] =
    useState<boolean>(false);
  return (
    <>
      {/* Cover image edit */}
      <div className="relative w-full rounded-lg rounded-t-none overflow-hidden h-[350px]">
        <img
          src={
            userInfo.cover ||
            "https://res.cloudinary.com/dbrd0cias/image/upload/v1681639252/default_cover_kvidog.png"
          }
          alt=""
          className="w-full h-auto object-cover"
        />
        <div className="absolute left-0 right-0 bottom-0 h-[80px]">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-gray-800 h-[80px] opacity-40"></div>
          {isOwner && (
            <button
              className="absolute top-1/2 -translate-y-1/2 right-8 px-3 py-2 rounded-lg active:scale-95 flex gap-2 items-center text-[14px] font-semibold bg-gradient-to-b from-white to-gray-100 active:from-slate-200 active:to-gray-300"
              onClick={() => {
                setShowEditCoverPhotoMenu(!showEditCoverPhotoMenu);
              }}
            >
              <i className="camera_filled_icon scale-[80%]"></i>
              <span className="hidden md:inline">Edit cover photo</span>
            </button>
          )}
        </div>
      </div>
      {showEditCoverPhotoMenu && isOwner && (
        <div className="absolute top-[329px] right-8 w-[350px] bg-white rounded-lg shadow2 p-2 flex flex-col z-20">
          <button className="flex gap-2 items-center p-2 hover:bg-gray-200 rounded-lg transition-all duration-100 ease-linear">
            <i className="photo_icon"></i>
            <span className="font-semibold">Select photo</span>
          </button>
          <button className="flex gap-2 items-center p-2 hover:bg-gray-200 rounded-lg transition-all duration-100 ease-linear">
            <i className="upload_icon"></i>
            <span className="font-semibold">Upload photo</span>
          </button>
          <div className="h-[0.5px] bg-gray-300 my-1 mx-2"></div>
          <button className="flex gap-2 items-center p-2 hover:bg-gray-200 rounded-lg transition-all duration-100 ease-linear">
            <i className="trash_icon"></i>
            <span className="font-semibold">Remove</span>
          </button>
        </div>
      )}
    </>
  );
};

export default CoverImage;
