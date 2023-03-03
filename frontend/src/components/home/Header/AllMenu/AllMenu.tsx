import menuStyles from "./style.module.css";
import {
  menu as allMenuData,
  create as createData,
} from "../../../../data/allMenu";
import React from "react";
import { Search } from "../../../../svg";
import AllMenuItem from "./AllMenuItem";
import { Link } from "react-router-dom";
type Props = {};

const AllMenu: React.FC<Props> = () => {
  return (
    <div className={`${menuStyles["all_menu-wrapper"]} shadow1`}>
      <p className="p-4 text-2xl leading-4 font-bold">Menu</p>
      <div className="flex pl-4 pb-4 gap-4 items-start">
        {/* Left */}
        <div className="rounded-lg bg-white shadow-lg w-[360px] shadow2 p-4">
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
        <div className="rounded-lg bg-white shadow-lg flex-1 shadow2 p-2">
          <h2 className=" pt-1 px-1 pb-3 text-xl leading-6 font-bold">
            Create
          </h2>
          <div className="flex flex-col justify-start items-stretch">
            {createData.slice(0, 3).map((item, key) => {
              return (
                <Link
                  key={key}
                  to="/"
                  className="flex gap-4 w-full items-center p-2 rounded-lg hover:bg-gray-100"
                >
                  <div className="w-9 h-9 rounded-full flex justify-center items-center bg-gray-200 flex-shrink-0">
                    <i className={item.icon} />
                  </div>
                  <span className="flex-1">{item.name}</span>
                </Link>
              );
            })}
            <div className="w-full h-[1px] my-2 bg-gray-300"></div>
            {createData.slice(3, 9).map((item, key) => {
              return (
                <Link
                  key={key}
                  to="/"
                  className="flex gap-4 w-full items-center p-2 rounded-lg hover:bg-gray-100"
                >
                  <div className="w-9 h-9 rounded-full flex justify-center items-center bg-gray-200 flex-shrink-0">
                    <i className={item.icon} />
                  </div>
                  <span className="flex-1">{item.name}</span>
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
