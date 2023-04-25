import React from "react";
import { CSSTransition } from "react-transition-group";
import MenuItem from "./MenuItem";
import { Return } from "@svg/index";

type Props = {
  menu: number;
  menuRef: any;
  onEnter?: () => void;
  setMenu: (menu: number) => void;
};

const SettingsMenu: React.FC<Props> = ({ menu, menuRef, onEnter, setMenu }) => {
  return (
    <CSSTransition
      in={menu === 1}
      nodeRef={menuRef}
      classNames="menu-1"
      timeout={200}
      unmountOnExit
      onEnter={onEnter}
    >
      <div className="w-full" ref={menuRef}>
        <div className="flex items-center p-2 pt-1">
          <div
            className="cursor-pointer w-9 h-9 rounded-full flex justify-center items-center hover--overlay relative overflow-hidden"
            onClick={() => {
              setMenu(0);
            }}
          >
            <Return />
          </div>
          <h2 className="text-2xl font-bold leading-7 pl-[10px] dark:text-[#E7E9ED]">
            Settings & privacy
          </h2>
        </div>
        {/* End top */}
        <div className="w-full">
          <MenuItem beforeIcon="settings_filled_icon">Settings</MenuItem>
          <MenuItem beforeIcon="privacy_checkup_icon">Privacy Chekup</MenuItem>
          <MenuItem beforeIcon="privacy_shortcuts_icon">
            Privacy Shortcuts
          </MenuItem>
          <MenuItem beforeIcon="activity_log_icon">Activity log</MenuItem>
          <MenuItem beforeIcon="news_icon">News Feed Prefrences</MenuItem>
          <MenuItem beforeIcon="language_icon">Language</MenuItem>
        </div>
      </div>
    </CSSTransition>
  );
};

export default SettingsMenu;
