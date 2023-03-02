import React from "react";
import { NavLink } from "react-router-dom";
import Tippy from "@tippyjs/react/headless";

type Props = {
  to: string;
  className: string;
  Icon: any;
  ActiveIcon: any;
  title: string;
};

const NavItem: React.FC<Props> = ({
  to,
  className,
  Icon,
  ActiveIcon,
  title,
}) => {
  return (
    <Tippy
      placement="bottom"
      delay={300}
      render={(attrs) => (
        <div
          className="py-1 px-3 bg-[#4a4646] text-gray-200 rounded-lg text-[8px] leading-[8px]"
          {...attrs}
        >
          {title}
        </div>
      )}
    >
      <NavLink to={to} className={className}>
        {({ isActive }) => {
          return isActive ? <ActiveIcon /> : <Icon />;
        }}
      </NavLink>
    </Tippy>
  );
};

export default NavItem;
