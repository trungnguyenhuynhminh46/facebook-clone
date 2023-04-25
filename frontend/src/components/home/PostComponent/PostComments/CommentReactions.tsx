import { Comment } from "@/types/Comment.type";
import reactions from "@/data/reactions";
import React from "react";

type Props = {
  comment: Comment;
  timeOutId: any;
  setTimeOutId: React.Dispatch<any>;
  setShowReactions: React.Dispatch<React.SetStateAction<boolean>>;
  handleButtonReactClick: (postId: string, reaction: string) => Promise<void>;
};

const CommentReactions: React.FC<Props> = ({
  comment,
  timeOutId,
  setTimeOutId,
  setShowReactions,
  handleButtonReactClick,
}) => {
  return (
    <div
      className="absolute top-0 left-0 -translate-y-full flex gap-3 p-1 bg-white dark:bg-[#2d2e2f] rounded-full border border-solid border-gray-300 dark:border-[#2d2e2f] shadow2"
      onMouseOver={() => {
        clearTimeout(timeOutId);
        setTimeOutId(
          setTimeout(() => {
            setShowReactions(true);
          }, 500)
        );
      }}
      onMouseLeave={() => {
        clearTimeout(timeOutId);
        setTimeOutId(
          setTimeout(() => {
            setShowReactions(false);
          }, 500)
        );
      }}
    >
      {Object.entries(reactions).map(([key, reaction]) => {
        return (
          <button
            key={key}
            className="w-9 h-9 rounded-full overflow-hidden cursor-pointer transition-all duration-200 ease-in-out hover:scale-[135%] bg-white"
            onClick={async () => {
              await handleButtonReactClick(comment._id, reaction.name);
              clearTimeout(timeOutId);
              setShowReactions(false);
            }}
          >
            <img
              src={`/reacts/${reaction.name}.gif`}
              alt=""
              className="w-full h-full object-cover scale-110"
            />
          </button>
        );
      })}
    </div>
  );
};

export default CommentReactions;
