import React, { useRef } from "react";
import useOnClickOutside from "../../../../hooks/useOnClickOutside";
import { Search } from "../../../../svg";
type Props = {
  setHideMenu: () => void;
};

const AllMenu: React.FC<Props> = ({ setHideMenu }) => {
  return (
    <div className="fixed top-[52px] bottom-4 overflow-hidden right-4 w-[608px] bg-[var(--bg-menu)] shadow-lg rounded-lg shadow1">
      <p className="p-4 text-2xl leading-4 font-bold">Menu</p>
      <div className="flex px-4 gap-4">
        {/* Left */}
        <div className="rounded-lg bg-white shadow-lg h-[300px] w-[360px] shadow2 p-4">
          <div className="rounded-full w-full overflow-hidden bg-[var(--bg-secondary)] flex justify-start items-center mb-4">
            <div className="px-3">
              <Search />
            </div>
            <input
              type="text"
              className="py-[10px] border-none outline-none bg-transparent leading-4 text-[15px] font-normal"
              placeholder="Search menu"
            />
          </div>
          <p className="text-[17px] leading-5 font-semibold pb-2">Social</p>
        </div>
        {/* Right */}
        <div className="rounded-lg bg-white shadow-lg h-[300px] flex-1 shadow2 p-4"></div>
      </div>
    </div>
  );
};

export default AllMenu;
