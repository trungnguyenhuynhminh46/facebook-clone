import React from "react";
import CreatePosts from "@/components/home/CreatePosts";
import CreatePostPopUp from "@/components/home/CreatePostPopUp";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/selectors/user";
import { Outlet, useParams } from "react-router-dom";
import classNames from "classnames";
import Style from "./style.module.css";
import { NavLink } from "react-router-dom";

type Props = {};

const ProfilePosts = (props: Props) => {
  const { email } = useParams();
  const currentUser = useSelector(selectCurrentUser);
  return (
    <div className="flex flex-col gap-[15px] mt-[15px] max-w-[1032px] px-4 mx-auto md:flex-row">
      <div className="bg-white rounded-lg w-full md:basis-2/5">left</div>
      <div className="rounded-lg w-full md:basis-3/5 flex flex-col gap-[15px]">
        <CreatePosts currentUser={currentUser} />
        {/* Posts grid */}
        <div className="w-full rounded-lg bg-white shadow2">
          {/* Top */}
          <div className="flex justify-between items-center px-4 border-b-[0.5px] border-solid border-gray-300">
            <span className="text-xl font-bold">Posts</span>
            <div className="flex gap-2 items-stretch h-[52px] py-[8px]">
              <button className="flex gap-1 items-center rounded-lg bg-gray-200 active:bg-gray-300 active:scale-95 px-3">
                <i className="equalize_icon"></i>
                <span className="font-semibold">Filters</span>
              </button>
              <button className="flex gap-1 items-center rounded-lg bg-gray-200 active:bg-gray-300 active:scale-95 px-3">
                <i className="manage_icon"></i>
                <span className="font-semibold">Manage posts</span>
              </button>
            </div>
          </div>
          {/* Botom */}
          <div className="flex items-stretch px-4">
            <NavLink
              to={`/profile/${email}`}
              end
              className={({ isActive }) =>
                classNames(Style["menu-item"], {
                  [Style["active"]]: isActive,
                })
              }
            >
              <i className="list_icon"></i>
              <span>List view</span>
            </NavLink>
            <NavLink
              to={`/profile/${email}/grid`}
              end
              className={({ isActive }) =>
                classNames(Style["menu-item"], {
                  [Style["active"]]: isActive,
                })
              }
            >
              <i className="grid_icon"></i>
              <span>Grid view</span>
            </NavLink>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default ProfilePosts;
