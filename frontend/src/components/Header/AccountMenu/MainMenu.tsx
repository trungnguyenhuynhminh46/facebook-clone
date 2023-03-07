import React from "react";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";
import menuStyles from "./style.module.css";
import MenuItem from "./MenuItem";

type Props = {
  menu: number;
  menuRef: any;
  onEnter?: () => void;
  currentUser: any;
  setMenu: (menu: number) => void;
};

const MainMenu: React.FC<Props> = ({
  menu,
  menuRef,
  onEnter,
  currentUser,
  setMenu,
}) => {
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
        <div className="flex flex-col justify-start items-stretch rounded-lg shadow3 p-1 mb-4">
          <Link
            to="/profile"
            className="flex gap-2 items-center p-3 rounded-lg hover:bg-gray-100 active:bg-gray-200"
          >
            <div className={menuStyles["account-menu_avatar"]}>
              <img src={currentUser?.picture} alt="" />
            </div>
            <span className="text-[17px] font-semibold">
              {currentUser?.username}
            </span>
          </Link>
          <div className="mx-3">
            <div className="w-full h-[1.5px] my-1 bg-gray-300"></div>
          </div>
          <button className="py-1 px-3 rounded-lg hover:bg-gray-100 active:bg-gray-200 flex">
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
          <MenuItem beforeIcon="logout_filled_icon" to="/logout">
            Log Out
          </MenuItem>
        </div>
      </div>
    </CSSTransition>
  );
};

export default MainMenu;
