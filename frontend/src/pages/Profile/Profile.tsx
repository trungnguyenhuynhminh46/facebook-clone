import React, { useState } from "react";
import { Dots } from "@/svg";

type Props = {};

const Profile = (props: Props) => {
  const [showEditCoverPhotoMenu, setShowEditCoverPhotoMenu] =
    useState<boolean>(false);
  return (
    <div className="relative w-full max-w-[1094px] min-h-screen mx-auto mt-14">
      {/* Cover image edit */}
      <div className="relative w-full rounded-lg rounded-t-none overflow-hidden h-[350px]">
        <img
          src="https://images.unsplash.com/photo-1680905669458-8c86c74d5f97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt=""
          className="w-full h-auto object-cover"
        />
        <div className="absolute left-0 right-0 bottom-0 h-[80px]">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-gray-800 h-[80px] opacity-40"></div>
          <button
            className="absolute top-1/2 -translate-y-1/2 right-8 px-3 py-2 rounded-lg active:scale-95 flex gap-2 items-center text-[14px] font-semibold bg-gradient-to-b from-white to-gray-100 active:from-slate-200 active:to-gray-300"
            onClick={() => {
              setShowEditCoverPhotoMenu(!showEditCoverPhotoMenu);
            }}
          >
            <i className="camera_filled_icon scale-[80%]"></i>
            <span>Edit cover photo</span>
          </button>
        </div>
      </div>
      {showEditCoverPhotoMenu && (
        <div className="absolute top-[329px] right-8 w-[350px] bg-white rounded-lg shadow2 p-2 flex flex-col">
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
      {/* User info */}
      <div className="relative px-6">
        <div className="absolute -top-8 left-6 w-[168px] h-[168px] rounded-full overflow-hidden border-[4px] border-solid border-white bg-white hover--overlay cursor-pointer">
          <img
            src="https://media.istockphoto.com/id/1307219947/vector/watercolor-rainbow-of-lgbt-flag-colors.jpg?s=612x612&w=0&k=20&c=TEWUB64Ff_AO5LEZlNm7tFYAMUgER0tn21RpluSyKlc="
            alt=""
            className="w-full rounded-full h-full object-cover border-[2px] border-solid border-gray-200"
          />
        </div>
        <div className="flex flex-col gap-1 ml-[200px] py-6">
          <h1 className="text-3xl font-bold">Nguyễn Huỳnh Minh Trung</h1>
          <span className="text-[#65676B] font-medium -mt-1 mb-2">
            223 friends
          </span>
          <div className="flex">
            {Array(6)
              .fill(0)
              .map((item, index) => {
                return (
                  <div className="relative w-8 h-8 border-[2px] border-solid border-white rounded-full cursor-pointer -ml-[8px] overflow-hidden">
                    <img
                      key={index}
                      src="https://images.unsplash.com/photo-1680905669458-8c86c74d5f97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=8"
                      alt=""
                      className={`w-full h-full object-cover`}
                    />
                  </div>
                );
              })}
            <div className="relative w-8 h-8 border-[2px] border-solid border-white rounded-full cursor-pointer -ml-[8px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1680905669458-8c86c74d5f97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=8"
                alt=""
                className={`w-full h-full object-cover`}
              />
              <div className="absolute inset-0 flex justify-center items-center z-10 bg-gray-800 opacity-80">
                <Dots fill="gray" width="16" height="16" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
