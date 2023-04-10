import { selectCurrentUser } from "@/store/selectors/user";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { left } from "@data/leftSidebar";
import { ChevonDown, ChevonUp } from "@/svg";
import Style from "./style.module.css";

type Props = {};

const BookMarks = (props: Props) => {
  const user = useSelector(selectCurrentUser);
  const [seeMore, setSeeMore] = useState(true);
  const [numItems, setNumItems] = useState(5);
  return (
    <div className="h-screen mt-14 flex flex-col py-2 px-3">
      <div className="flex flex-col py-3 px-2">
        <Link
          to={`/profile/${user.email || ""}`}
          className="flex gap-3 items-center p-2 rounded-lg hover:bg-gray-200"
        >
          <div className="w-9 h-9 rounded-full border border-gray-100 overflow-hidden">
            <img src={user.picture} alt="" />
          </div>
          <p className="text-[#050505] font-medium text-[15px]">
            {user.username}
          </p>
        </Link>
        {left.slice(0, numItems).map((item, index) => {
          return (
            <Link
              to="/"
              key={index}
              className="flex gap-3 items-center p-2 rounded-lg hover:bg-gray-200"
            >
              <div>
                <img src={`/left/${item.img}.png`} alt="" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[#050505] font-medium text-[15px]">
                  {item.text}
                </p>
                <p className={Style["alert"]}>5 news</p>
              </div>
            </Link>
          );
        })}
        <button
          className="cursor-pointer flex gap-3 items-center p-2 rounded-lg hover:bg-gray-200"
          onClick={() => {
            if (seeMore) {
              setSeeMore(false);
              setNumItems(left.length);
            }
            if (!seeMore) {
              setSeeMore(true);
              setNumItems(5);
            }
          }}
        >
          <div className="w-9 h-9 rounded-full bg-gray-300 overflow-hidden flex justify-center items-center">
            {seeMore ? <ChevonDown /> : <ChevonUp />}
          </div>
          <p className="text-[#050505] font-medium text-[15px]">
            {seeMore ? "See more" : "See less"}
          </p>
        </button>
      </div>
      {/* Shortcut */}
      <div className="h-[1px] w-auto bg-gray-300 my-2 mx-4"></div>
      <p className="text-[var(--color-secondary)] font-semibold text-[17px] px-4 py-3">
        You shortcuts
      </p>
      <div className="flex flex-col py-3 px-2 min-h-[132px]">
        <a
          href="https://github.com/trungnguyenhuynhminh46"
          target="blank"
          className="flex gap-3 items-center p-2 rounded-lg hover:bg-gray-200"
        >
          <div className="w-9 h-9 rounded-full border border-gray-100 overflow-hidden">
            <img src="/icons/github.png" alt="" />
          </div>
          <p className="text-[#050505] font-medium text-[15px]">Github</p>
        </a>
        <a
          href="https://www.facebook.com/trung.nguyenhuynhminh.33/"
          target="blank"
          className="flex gap-3 items-center p-2 rounded-lg hover:bg-gray-200"
        >
          <div className="w-9 h-9 rounded-full border border-gray-100 overflow-hidden">
            <img src="/icons/icon.png" alt="" />
          </div>
          <p className="text-[#050505] font-medium text-[15px]">Facebook</p>
        </a>
      </div>
      <p className="gap-2 px-4 mb-4">
        <Link
          to="/privacy"
          className="text-sm text-gray-400 hover:underline transition-all duration-300 ease-linear mr-2"
        >
          Privacy
        </Link>
        <Link
          to="/term"
          className="text-sm text-gray-400 hover:underline transition-all duration-300 ease-linear mx-2"
        >
          Term
        </Link>
        <Link
          to="/advertising"
          className="text-sm text-gray-400 hover:underline transition-all duration-300 ease-linear mx-2"
        >
          Advertising
        </Link>
        <Link
          to="/cookies"
          className="text-sm text-gray-400 hover:underline transition-all duration-300 ease-linear mx-2"
        >
          Cookies
        </Link>
        <Link
          to="/choices"
          className="text-sm text-gray-400 hover:underline transition-all duration-300 ease-linear mx-2"
        >
          Ad choices
        </Link>
        <Link to="/more" className="text-sm text-gray-400 mx-2">
          More
        </Link>
        <span className="text-sm text-gray-400">Meta © 2023</span>
      </p>
    </div>
  );
};

export default BookMarks;
