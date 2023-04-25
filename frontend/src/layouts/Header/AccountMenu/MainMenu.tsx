import React from "react";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";
import menuStyles from "./style.module.css";
import MenuItem from "./MenuItem";
import { logout } from "@/store/slices/user";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { User } from "@/types/User.type";
import MiniFooter from "@/components/MiniFooter";

type Props = {
  menu: number;
  menuRef: any;
  onEnter?: () => void;
  currentUser: User;
  setMenu: (menu: number) => void;
};

const MainMenu: React.FC<Props> = ({
  menu,
  menuRef,
  onEnter,
  currentUser,
  setMenu,
}) => {
  const dispatch = useDispatch();
  return (
    <CSSTransition
      in={menu === 0}
      nodeRef={menuRef}
      classNames="menu-0"
      timeout={200}
      unmountOnExit
      onEnter={onEnter}
    >
      <div className="w-full" ref={menuRef}>
        <div className="flex flex-col justify-start items-stretch rounded-lg shadow3 p-1 mb-4 dark:bg-[#232324]">
          <Link
            to={`/profile/${currentUser.email}`}
            className="flex gap-2 items-center p-3 rounded-lg hover--overlay relative overflow-hidden"
          >
            <div className={menuStyles["account-menu_avatar"]}>
              <img
                src={currentUser?.picture}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-[17px] font-semibold dark:text-[#E7E9ED]">
              {currentUser?.username}
            </span>
          </Link>
          <div className="mx-3">
            <div className="w-full h-[1.5px] my-1 bg-gray-300 dark:bg-[#3E4042]"></div>
          </div>
          <button className="py-1 px-3 rounded-lg hover--overlay relative overflow-hidden flex">
            <span className="text-[15px] font-medium text-[var(--blue-color)]">
              See all profiles
            </span>
          </button>
        </div>
        {/* End top */}
        <div className="w-full">
          <MenuItem
            beforeIcon="settings_filled_icon"
            moveTo={() => {
              setMenu(1);
            }}
          >
            Settings & privacy
          </MenuItem>
          <MenuItem
            beforeIcon="help_filled_icon"
            moveTo={() => {
              setMenu(2);
            }}
          >
            Help & support
          </MenuItem>
          <MenuItem
            beforeIcon="dark_filled_icon"
            moveTo={() => {
              setMenu(3);
            }}
          >
            Display & Accessibility
          </MenuItem>
          <MenuItem beforeIcon="report_filled_icon">Give feedback</MenuItem>
          <MenuItem
            beforeIcon="logout_filled_icon"
            onClick={() => {
              dispatch(logout());
              Cookies.set("user", "");
            }}
          >
            Log Out
          </MenuItem>
          <div className="px-3 mt-1">
            <MiniFooter />
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default MainMenu;
