import React from "react";
import Tippy from "@tippyjs/react/headless";

type Props = {
  title: string;
  children: any;
  placement?: any;
  offset?: [number, number];
};

const ToolTip: React.FC<Props> = ({
  title,
  children,
  placement = "bottom",
  offset = [0, 6],
}) => {
  return (
    <Tippy
      placement={placement}
      offset={offset}
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
