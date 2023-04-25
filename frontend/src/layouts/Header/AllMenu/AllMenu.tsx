import menuStyles from "./style.module.css";
import { menu as allMenuData, create as createData } from "@data/allMenu";
import React from "react";
import { Search } from "@svg/index";
import AllMenuItem from "./AllMenuItem";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
type Props = {};

const AllMenu: React.FC<Props> = () => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 688px)" });
  return (
    <div
      className={`${menuStyles["all_menu-wrapper"]} shadow1 custom-scrollbar dark:bg-[#323436]`}
    >
      <p className="p-4 text-2xl leading-4 font-bold dark:text-[#DCDEE2]">
        Menu
      </p>
      <div className={`${menuStyles["all_menu-inner"]}`}>
        {/* Left */}
        <div
          className={`rounded-lg bg-white dark:bg-[#242526] shadow-lg shadow2 p-4 ${
            isSmallScreen ? "w-full" : "w-[360px]"
          }`}
        >
          <div className="rounded-full w-full overflow-hidden bg-[var(--bg-secondary)] dark:bg-[#3A3B3C] flex justify-start items-center mb-4">
            <div className="px-3">
              <Search />
            </div>
            <input
              type="text"
              className="py-[10px] border-none outline-none bg-transparent leading-4 text-[15px] font-normal dark:placeholder:text-[#b0b3b8] dark:text-[#b0b3b8]"
              placeholder="Search menu"
            />
          </div>
          <AllMenuItem title="Social" data={allMenuData.slice(0, 6)} />
          <AllMenuItem title="Entertainment" data={allMenuData.slice(6, 9)} />
          <AllMenuItem title="Shopping" data={allMenuData.slice(9, 11)} />
          <AllMenuItem title="Personal" data={allMenuData.slice(11, 15)} />
          <AllMenuItem title="Professional" data={allMenuData.slice(15, 17)} />
          <AllMenuItem title="Community" data={allMenuData.slice(17, 21)} />
          <AllMenuItem
            title="More from Meta"
            data={allMenuData.slice(21, 23)}
          />
        </div>
        {/* Right */}
        <div className="rounded-lg bg-white dark:bg-[#242526] shadow-lg flex-1 shadow2 p-2">
          <h2 className=" pt-1 px-1 pb-3 text-xl leading-6 font-bold dark:text-[#DCDEE2]">
            Create
          </h2>
          <div className="flex flex-col justify-start items-stretch">
            {createData.slice(0, 3).map((item, key) => {
              return (
                <Link
                  key={key}
                  to="/"
                  className="flex gap-4 w-full items-center p-2 rounded-lg relative hover--overlay overflow-hidden"
                >
                  <div className="w-9 h-9 rounded-full flex justify-center items-center bg-gray-200 dark:bg-[#3A3B3C] flex-shrink-0">
                    <i className={`${item.icon} dark:invert`} />
                  </div>
                  <span className="flex-1 dark:text-[#DCDEE2]">
                    {item.name}
                  </span>
                </Link>
              );
            })}
            <div className="w-full h-[1px] my-2 bg-gray-300 dark:bg-[#3E4042]"></div>
            {createData.slice(3, 9).map((item, key) => {
              return (
                <Link
                  key={key}
                  to="/"
                  className="flex gap-4 w-full items-center p-2 rounded-lg relative hover--overlay overflow-hidden"
                >
                  <div className="w-9 h-9 rounded-full flex justify-center items-center bg-gray-200 flex-shrink-0 dark:bg-[#3A3B3C]">
                    <i className={`${item.icon} dark:invert`} />
                  </div>
                  <span className="flex-1 dark:text-[#DCDEE2]">
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllMenu;
