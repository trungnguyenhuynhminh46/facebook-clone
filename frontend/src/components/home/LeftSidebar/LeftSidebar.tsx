import { useState } from "react";
import { left } from "@data/leftSidebar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/selectors/user";
import leftSideStyles from "./style.module.css";
import { ChevonDown, ChevonUp } from "@/svg";

type Props = {};

const LeftSidebar = (props: Props) => {
  const user = useSelector(selectCurrentUser);
  const [seeMore, setSeeMore] = useState(true);
  const [numItems, setNumItems] = useState(5);
  return (
    <div
      className={`${leftSideStyles["left-sidebar-wrapper"]} custom-scrollbar`}
    >
      <div className="flex flex-col py-3 px-2">
        <Link
          to={`/profile/${user.email}`}
          className="flex gap-3 items-center p-2 rounded-lg relative overflow-hidden hover--overlay"
        >
          <div className="w-9 h-9 rounded-full border border-gray-100 dark:border-gray-700 overflow-hidden">
            <img
              src={user.picture}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-[#050505] dark:text-[#E4E6EB] font-medium text-[15px]">
            {user.username}
          </p>
        </Link>
        {left.slice(0, numItems).map((item, index) => {
          if (!item.to) {
            return (
              <button
                key={index}
                className="flex gap-3 items-center p-2 rounded-lg relative overflow-hidden hover--overlay"
              >
                <div>
                  <img src={`/left/${item.img}.png`} alt="" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-[#050505] dark:text-[#E4E6EB] font-medium text-[15px]">
                    {item.text}
                  </p>
                  {/* <p className={leftSideStyles["alert"]}>5 news</p> */}
                </div>
              </button>
            );
          }
          return (
            <Link
              to={item.to}
              key={index}
              className="flex gap-3 items-center p-2 rounded-lg relative overflow-hidden hover--overlay"
            >
              <div>
                <img src={`/left/${item.img}.png`} alt="" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[#050505] dark:text-[#E4E6EB] font-medium text-[15px]">
                  {item.text}
                </p>
                <p className={leftSideStyles["alert"]}>5 news</p>
              </div>
            </Link>
          );
        })}
        <button
          className="cursor-pointer flex gap-3 items-center p-2 rounded-lg relative overflow-hidden hover--overlay"
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
          <div className="w-9 h-9 rounded-full bg-gray-300 dark:bg-[#3A3B3C] overflow-hidden flex justify-center items-center">
            {seeMore ? (
              <ChevonDown className="fill-[#65676B] dark:fill-[#b0b3b8] scale-125" />
            ) : (
              <ChevonUp className="fill-[#65676B] dark:fill-[#b0b3b8] scale-125" />
            )}
          </div>
          <p className="text-[#050505] dark:text-[#E4E6EB] font-medium text-[15px]">
            {seeMore ? "See more" : "See less"}
          </p>
        </button>
      </div>
      {/* Shortcut */}
      <div className="h-[1px] w-auto bg-gray-300 dark:bg-gray-700 my-2 mx-4"></div>
      <p className="text-[var(--color-secondary)] font-semibold text-[17px] px-4 py-3">
        Your shortcuts
      </p>
      <div className="flex flex-col py-3 px-2 min-h-[132px]">
        <a
          href="https://github.com/trungnguyenhuynhminh46"
          target="blank"
          className="flex gap-3 items-center p-2 rounded-lg relative overflow-hidden hover--overlay"
        >
          <div className="w-9 h-9 rounded-full border border-gray-100 dark:border-gray-700 overflow-hidden">
            <img src="/icons/github.png" className="dark:invert" alt="" />
          </div>
          <p className="text-[#050505] dark:text-[#E4E6EB] font-medium text-[15px]">
            Github
          </p>
        </a>
        <a
          href="https://www.facebook.com/trung.nguyenhuynhminh.33/"
          target="blank"
          className="flex gap-3 items-center p-2 rounded-lg relative overflow-hidden hover--overlay"
        >
          <div className="w-9 h-9 rounded-full border border-gray-100 dark:border-gray-700 overflow-hidden">
            <img src="/icons/icon.png" alt="" />
          </div>
          <p className="text-[#050505] dark:text-[#E4E6EB] font-medium text-[15px]">
            Facebook
          </p>
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

export default LeftSidebar;
