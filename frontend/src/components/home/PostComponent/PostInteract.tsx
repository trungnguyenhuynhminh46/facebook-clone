import { Post } from "@/types/Post";
import { useMediaQuery } from "react-responsive";
import React from "react";
import Style from "./style.module.css";

type Props = {
  post: Post;
};

const PostInteract: React.FC<Props> = ({ post }) => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 688px)" });
  const reactions = post.reactionsInfo;
  const sortedReactions = Object.entries(reactions).sort(
    ([, a], [, b]) => a - b
  );
  const total = sortedReactions.reduce((sum, reaction) => {
    return sum + reaction[1];
  }, 0);
  return (
    <div className="cursor-pointer flex justify-between items-center py-3 px-4">
      {/* Reactions */}
      <div className="flex gap-2 group">
        <div className={`${Style["reactions-container"]}`}>
          <img src={`/reacts/angry.svg`} className="w-[22px]" alt="" />
          <img src={`/reacts/like.svg`} className="w-[22px]" alt="" />
          <img src={`/reacts/wow.svg`} className="w-[22px]" alt="" />
        </div>
        <span className="text-[var(--color-secondary)] text-[15px] group-hover:underline">
          1.8K
        </span>
      </div>
      {/* Comments and share */}
      <div className="text-[var(--color-secondary)] text-[15px] flex gap-4">
        <span className="cursor-pointer hover:underline flex gap-1 items-center">
          758{" "}
          {isSmallScreen ? <i className="comment_icon w-4"></i> : "comments"}
        </span>
        <span className="cursor-pointer hover:underline flex gap-1 items-center">
          267 {isSmallScreen ? <i className="share_icon w-4"></i> : "shares"}
        </span>
      </div>
    </div>
  );
};

export default PostInteract;
