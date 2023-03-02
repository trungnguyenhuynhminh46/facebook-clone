import React from "react";
import { NavLink } from "react-router-dom";
import Tippy from "@tippyjs/react/headless";

type Props = {
  title: string;
  children: any;
};

const ToolTip: React.FC<Props> = ({ title, children }) => {
  return (
    <Tippy
      placement="bottom"
      delay={300}
      render={(attrs) => (
        <div
          className="py-2 px-3 bg-gray-800 text-gray-200 rounded-lg text-sm"
          {...attrs}
        >
          {title}
        </div>
      )}
    >
      {children}
    </Tippy>
  );
};

export default ToolTip;
