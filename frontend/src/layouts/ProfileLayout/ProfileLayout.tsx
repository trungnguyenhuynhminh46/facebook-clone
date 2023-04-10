import React, { useState } from "react";
import { Dots } from "@/svg";
import { NavLink, useLocation, useParams } from "react-router-dom";
import Style from "./style.module.css";
import classNames from "classnames";
import { Outlet } from "react-router-dom";

type Props = {};

const ProfileLayout = (props: Props) => {
  const location = useLocation();
  const list = location.pathname.split("/");
  const last = list[list.length - 1];
  const { email } = useParams();
  const [showEditCoverPhotoMenu, setShowEditCoverPhotoMenu] =
    useState<boolean>(false);
  return (
    <>
      <div className="w-full bg-white">
        <div className="relative w-full max-w-[1094px] mx-auto mt-14">
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
                <span className="hidden md:inline">Edit cover photo</span>
              </button>
            </div>
          </div>
          {showEditCoverPhotoMenu && (
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
          {/* User info */}
          <div className="relative px-4 max-w-[1032px] mx-auto">
            {/* User image */}
            <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-0 md:-top-8 md:left-6 md:translate-x-0 md:translate-y-0 w-[168px] h-[168px] rounded-full overflow-hidden border-[4px] border-solid border-white bg-white hover--overlay cursor-pointer">
              <img
                src="https://media.istockphoto.com/id/1307219947/vector/watercolor-rainbow-of-lgbt-flag-colors.jpg?s=612x612&w=0&k=20&c=TEWUB64Ff_AO5LEZlNm7tFYAMUgER0tn21RpluSyKlc="
                alt=""
                className="w-full rounded-full h-full object-cover border-[2px] border-solid border-gray-200"
              />
            </div>
            {/* Camera button */}
            <div className="absolute right-1/2 translate-x-[80px] top-3 translate-y-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300 flex justify-center items-center cursor-pointer md:top-[52px] md:left-0 md:right-auto md:translate-x-[160px]">
              <i className="camera_filled_icon"></i>
            </div>
            {/* User info */}
            <div className="flex flex-col gap-1 items-center pt-[100px] md:items-start md:ml-[200px] md:pt-6">
              <h1 className="text-3xl font-bold">Nguyễn Huỳnh Minh Trung</h1>
              <span className="text-[#65676B] font-medium -mt-1 mb-2">
                223 friends
              </span>
              <div className="flex">
                {Array(6)
                  .fill(0)
                  .map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="relative w-8 h-8 border-[2px] border-solid border-white rounded-full cursor-pointer -ml-[8px] overflow-hidden"
                      >
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
            {/* Buttons */}
            <div className="w-full flex gap-2 mt-5 mx-auto md:w-[160px] md:absolute md:right-4 md:mt-1 md:-translate-y-full md:flex-col lg:w-[268px] lg:flex-row">
              <button className="flex items-center justify-center gap-2 flex-grow h-9 bg-blue-600 text-white font-semibold rounded-md active:scale-95 active:bg-blue-700">
                <span>+</span> <span>Add to story</span>
              </button>
              <button className="flex items-center justify-center gap-2 flex-grow h-9 rounded-md bg-gray-300 active:scale-95 active:bg-gray-400 opacity-80 text-black">
                <i className="edit_icon"></i>
                <span>Edit profile</span>
              </button>
            </div>
            {/* Navigation */}
            <div className="flex py-1 border-t-[0.5px] border-solid border-gray-400 mt-4">
              <NavLink
                to={`/profile/${email || ""}`}
                className={({ isActive }) =>
                  classNames(Style["menu-item"], {
                    [Style["active"]]:
                      isActive &&
                      last !== "about" &&
                      last !== "friends" &&
                      last !== "photos",
                  })
                }
              >
                Posts
              </NavLink>
              <NavLink
                to={`/profile/${email || ""}/about`}
                end
                className={({ isActive }) =>
                  classNames(Style["menu-item"], {
                    [Style["active"]]: isActive,
                  })
                }
              >
                About
              </NavLink>
              <NavLink
                to={`/profile/${email || ""}/friends`}
                end
                className={({ isActive }) => {
                  return classNames(Style["menu-item"], {
                    [Style["active"]]: isActive,
                  });
                }}
              >
                Friends
              </NavLink>
              <NavLink
                to={`/profile/${email || ""}/photos`}
                end
                className={({ isActive }) =>
                  classNames(Style["menu-item"], {
                    [Style["active"]]: isActive,
                  })
                }
              >
                Photos
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default ProfileLayout;
