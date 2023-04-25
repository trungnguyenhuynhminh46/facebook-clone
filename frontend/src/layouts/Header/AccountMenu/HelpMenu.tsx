import React from "react";
import { CSSTransition } from "react-transition-group";
import { Return } from "@/svg";
import MenuItem from "./MenuItem";

type Props = {
  menu: number;
  menuRef: any;
  onEnter?: () => void;
  setMenu: (menu: number) => void;
};

const HelpMenu: React.FC<Props> = ({ menu, menuRef, onEnter, setMenu }) => {
  return (
    <CSSTransition
      in={menu === 2}
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
            Help & support
          </h2>
        </div>
        {/* End top */}
        <div className="w-full">
          <MenuItem beforeIcon="help_center_icon">Help Center</MenuItem>
          <MenuItem beforeIcon="email_icon">Support Inbox</MenuItem>
          <MenuItem beforeIcon="info_filled_icon">Report a Problem</MenuItem>
        </div>
      </div>
    </CSSTransition>
  );
};

export default HelpMenu;
