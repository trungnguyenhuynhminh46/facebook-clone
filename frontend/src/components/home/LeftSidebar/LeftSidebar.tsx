import React, { useEffect, useState } from "react";
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
  useEffect(() => {
    console.log(seeMore, numItems);
  }, [seeMore, numItems]);
  return (
    <div className={leftSideStyles["left-sidebar-wrapper"]}>
      <div className="flex flex-col py-3 px-2">
        <Link
          to="/profile"
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
              <p className="text-[#050505] font-medium text-[15px]">
                {item.text}
              </p>
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
    </div>
  );
};

export default LeftSidebar;
