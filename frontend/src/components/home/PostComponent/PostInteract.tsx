import { Post } from "@/types/Post.type";
import { useMediaQuery } from "react-responsive";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Style from "./style.module.css";
import ToolTipReactions from "@/components/ToolTipReactions";
import ToolTipComments from "@/components/ToolTipComments";
import { ClipLoader } from "react-spinners";
import { useReactionDetailByPostIdQuery } from "@/store/api/reactionsApi";

type Props = {
  post: Post;
  setShowComments: React.Dispatch<React.SetStateAction<boolean>>;
};

const PostInteract: React.FC<Props> = ({ post, setShowComments }) => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 688px)" });
  const reactions = post.reactionsInfo;
  const sortedReactions = Object.entries(reactions).sort(
    ([, a], [, b]) => b - a
  );
  const total = sortedReactions.reduce((sum, reaction) => {
    return sum + reaction[1];
  }, 0);
  return (
    <div className="cursor-pointer flex items-center py-3 px-4">
      {/* Reactions */}
      {total > 0 && (
        <ToolTipReactions postId={post._id}>
          <div className="flex gap-1 group relative">
            <div className={`${Style["reactions-container"]}`}>
              {sortedReactions.slice(0, 3).map(([reaction, qty]) => {
                if (qty > 0) {
                  return (
                    <img
                      key={reaction}
                      src={`/reacts/${reaction}.svg`}
                      className="w-[22px]"
                      alt=""
                    />
                  );
                }
              })}
            </div>
            <span className="text-[var(--color-secondary)] text-[15px] group-hover:underline">
              {total}
            </span>
          </div>
        </ToolTipReactions>
      )}
      {/* Comments and share */}
      <div className="ml-auto text-[var(--color-secondary)] text-[15px] flex gap-4">
        {post.commentsCount > 0 && (
          <ToolTipComments postId={post._id}>
            <span
              className="cursor-pointer hover:underline flex gap-1 items-center"
              onClick={() => {
                setShowComments(true);
              }}
            >
              {post.commentsCount}{" "}
              {isSmallScreen ? (
                <i className="comment_icon w-4"></i>
              ) : (
                "comments"
              )}
            </span>
          </ToolTipComments>
        )}
        {post.sharedCount > 0 && (
          <span className="cursor-pointer hover:underline flex gap-1 items-center">
            {post.sharedCount}{" "}
            {isSmallScreen ? <i className="share_icon w-4"></i> : "shares"}
          </span>
        )}
      </div>
    </div>
  );
};

export default PostInteract;
