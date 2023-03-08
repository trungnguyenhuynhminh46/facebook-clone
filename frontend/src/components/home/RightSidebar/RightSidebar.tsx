import React from "react";
import rightSidebarStyles from "./style.module.css";
import { NewRoom, Search, Dots } from "@/svg";
import ToolTip from "@/components/ToolTip";

type Props = {
  currentUser: any;
};

type ContactItemProps = {
  user: any;
};

const ContactItem: React.FC<ContactItemProps> = ({ user }) => {
  return (
    <button className="flex gap-3 items-center p-2 rounded-lg hover:bg-gray-200">
      <div className="w-9 h-9 rounded-full border border-gray-100 overflow-hidden">
        <img src={user.picture} alt="" />
      </div>
      <p className="text-[#050505] font-medium text-[15px]">{user.username}</p>
    </button>
  );
};

const RightSidebar: React.FC<Props> = ({ currentUser }) => {
  return (
    <div className={rightSidebarStyles["right-sidebar-wrapper"]}>
      <div className="flex flex-col py-3 px-2">
        <div className="flex justify-between items-center">
          <p className="text-[var(--color-secondary)] font-semibold text-[17px] px-4 py-3">
            Contact
          </p>
          <div className="flex gap-1">
            <ToolTip title="New calls" placement="bottom-end" offset={[0, -4]}>
              <button className="w-8 h-8 rounded-full cursor-pointer transition-all duration-100 ease-linear hover:bg-gray-300 flex justify-center items-center">
                <NewRoom />
              </button>
            </ToolTip>
            <ToolTip
              title="Search by name or group"
              placement="bottom-end"
              offset={[0, -4]}
            >
              <button className="w-8 h-8 rounded-full cursor-pointer transition-all duration-100 ease-linear hover:bg-gray-300 flex justify-center items-center">
                <Search />
              </button>
            </ToolTip>
            <ToolTip title="Options" placement="bottom-end" offset={[0, -4]}>
              <button className="w-8 h-8 rounded-full cursor-pointer transition-all duration-100 ease-linear hover:bg-gray-300 flex justify-center items-center">
                <Dots />
              </button>
            </ToolTip>
          </div>
        </div>
        <div className="flex flex-col">
          <ContactItem user={currentUser} />
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
