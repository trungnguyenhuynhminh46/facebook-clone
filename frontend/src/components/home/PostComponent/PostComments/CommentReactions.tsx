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
      className="absolute top-0 left-0 -translate-y-full flex gap-3 p-1 bg-white rounded-full border border-solid border-gray-300 shadow2"
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
          <img
            key={key}
            src={`/reacts/${reaction.name}.gif`}
            alt=""
            className="w-9 h-9 cursor-pointer transition-all duration-200 ease-in-out hover:scale-[135%]"
            onClick={async () => {
              await handleButtonReactClick(comment._id, reaction.name);
              clearTimeout(timeOutId);
              setShowReactions(false);
            }}
          />
        );
      })}
    </div>
  );
};

export default CommentReactions;
