import React from "react";
import { Return } from "../../../../svg";

type Props = {
  setHideMenu: () => void;
};

const SearchMenu: React.FC<Props> = ({ setHideMenu }) => {
  return (
    <div className="fixed top-0 left-0 w-[320px] bg-white z-20 rounded-lg shadow-xl shadow1">
      <div
        className="absolute top-[18px] left-4 cursor-pointer"
        onClick={() => {
          setHideMenu();
        }}
      >
        <Return />
      </div>
      <div className="h-[56px]"></div>
      <div className="p-3 flex justify-center items-center w-full text-[15px] text-[var(--color-secondary)] font-[300]">
        No recent searches
      </div>
    </div>
  );
};

export default SearchMenu;
