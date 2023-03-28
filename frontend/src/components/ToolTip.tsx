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
          className="py-[6px] px-[10px] bg-gray-800 opacity-90 text-gray-200 rounded-lg text-[12px]"
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
