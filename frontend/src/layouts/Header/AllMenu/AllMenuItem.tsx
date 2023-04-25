import React from "react";
import menuStyles from "./style.module.css";
import { Link } from "react-router-dom";

type Props = {
  title: string;
  data: any[];
};

const AllMenuItem: React.FC<Props> = ({ title, data }) => {
  return (
    <div
      className={`${menuStyles["all_menu_item-group"]} dark:border-[#3E4042]`}
    >
      <p
        className={`${menuStyles["all_menu_item-header"]} dark:text-[#DCDEE2]`}
      >
        {title}
      </p>
      <div className="flex flex-col justify-start items-stretch">
        {data.map((item, key) => {
          return (
            <Link
              key={key}
              to="/"
              className="relative flex cursor-pointer rounded-lg overflow-hidden hover--overlay"
            >
              <div className="mr-3 my-2 flex-shrink-0">
                <img src={`/left/${item.icon}.png`} alt="" />
              </div>
              <div className="flex flex-col flex-1 py-[8px]">
                <h4 className="my-[5px] text-[15px] font-medium leading-3 dark:text-[#DCDEE2]">
                  {item.name}
                </h4>
                <p className="my-[5px] text-[13px] leading-3 dark:text-[#66676A]">
                  {item.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AllMenuItem;
