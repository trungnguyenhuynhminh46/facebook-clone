import menuStyles from "./style.module.css";
import React, { useState } from "react";
import { selectCurrentUser } from "../../../../store/selectors/user";
import { useSelector } from "react-redux";
// Components
import { Link } from "react-router-dom";

type Props = {};

const AccountMenu = (props: Props) => {
  const currentUser = useSelector(selectCurrentUser);
  const [menu, setMenu] = useState(0);
  return (
    <>
      {menu === 0 && (
        <div className="fixed top-[52px] right-4 rounded-lg bg-white w-[360px] pt-3 px-4 shadow3">
          <div className="flex flex-col justify-start items-stretch rounded-lg shadow3 p-1 mb-4">
            <Link
              to="/profile"
              className="flex gap-2 items-center p-3 rounded-lg hover:bg-gray-100 active:bg-gray-200"
            >
              <Link to="/profile" className={menuStyles["account-menu_avatar"]}>
                <img src={currentUser?.picture} alt="" />
              </Link>
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
            <button className="flex gap-3 items-center p-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 w-full">
              <div className="w-9 h-9 rounded-full bg-gray-200 flex justify-center items-center flex-shrink-0">
                <i className="report_filled_icon"></i>
              </div>
              <div className="flex-1 flex">
                <span className="text-[15px] font-medium">
                  Settings & privacy
                </span>
              </div>
              <i className="right_icon flex-shrink-0"></i>
            </button>
            <button className="flex gap-3 items-center p-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 w-full">
              <div className="w-9 h-9 rounded-full bg-gray-200 flex justify-center items-center flex-shrink-0">
                <i className="report_filled_icon"></i>
              </div>
              <div className="flex-1 flex">
                <span className="text-[15px] font-medium">
                  Settings & privacy
                </span>
              </div>
              <i className="right_icon flex-shrink-0"></i>
            </button>
            <button className="flex gap-3 items-center p-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 w-full">
              <div className="w-9 h-9 rounded-full bg-gray-200 flex justify-center items-center flex-shrink-0">
                <i className="report_filled_icon"></i>
              </div>
              <div className="flex-1 flex">
                <span className="text-[15px] font-medium">
                  Settings & privacy
                </span>
              </div>
              <i className="right_icon flex-shrink-0"></i>
            </button>
            <button className="flex gap-3 items-center p-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 w-full">
              <div className="w-9 h-9 rounded-full bg-gray-200 flex justify-center items-center flex-shrink-0">
                <i className="report_filled_icon"></i>
              </div>
              <div className="flex-1 flex">
                <span className="text-[15px] font-medium">
                  Settings & privacy
                </span>
              </div>
            </button>
            <button className="flex gap-3 items-center p-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 w-full">
              <div className="w-9 h-9 rounded-full bg-gray-200 flex justify-center items-center flex-shrink-0">
                <i className="report_filled_icon"></i>
              </div>
              <div className="flex-1 flex">
                <span className="text-[15px] font-medium">
                  Settings & privacy
                </span>
              </div>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AccountMenu;
