import classNames from "classnames";
import React from "react";
import { NavLink, useParams } from "react-router-dom";
import Style from "./style.module.css";

type Props = {
  isOwner: boolean;
};

const ManagePostsMenu: React.FC<Props> = ({ isOwner }) => {
  const { email } = useParams();
  return (
    <div className="w-full rounded-lg bg-white shadow2">
      {/* Top */}
      <div className="flex justify-between items-center px-4 border-b-[0.5px] border-solid border-gray-300">
        <span className="text-xl font-bold">Posts</span>
        <div className="flex gap-2 items-stretch h-[52px] py-[8px]">
          <button className="flex gap-1 items-center rounded-lg bg-gray-200 active:bg-gray-300 active:scale-95 px-3">
            <i className="equalize_icon"></i>
            <span className="font-semibold">Filters</span>
          </button>
          {isOwner && (
            <button className="flex gap-1 items-center rounded-lg bg-gray-200 active:bg-gray-300 active:scale-95 px-3">
              <i className="manage_icon"></i>
              <span className="font-semibold">Manage posts</span>
            </button>
          )}
        </div>
      </div>
      {/* Botom */}
      {isOwner && (
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
              classNames("pointer-events-none", Style["menu-item"], {
                [Style["active"]]: isActive,
              })
            }
          >
            <i className="grid_icon"></i>
            <span>Grid view</span>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default ManagePostsMenu;
