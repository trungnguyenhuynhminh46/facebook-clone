import React from "react";
import Tippy from "@tippyjs/react/headless";
import { Reaction } from "@/types/Reaction.type";

type Props = {
  commentId?: string;
  postId?: string;
  placement?: any;
  offset?: [number, number];
  children: any;
};

const ToolTip: React.FC<Props> = ({
  commentId,
  postId,
  placement = "bottom",
  offset = [0, 6],
  children,
}) => {
  let reactionsList: Reaction[] = [];
  if (postId) {
  }
  if (commentId) {
  }
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
          {reactionsList &&
            reactionsList.map((reaction) => {
              return <div>Tên user 1</div>;
            })}
        </div>
      )}
    >
      {children}
    </Tippy>
  );
};

export default ToolTip;
