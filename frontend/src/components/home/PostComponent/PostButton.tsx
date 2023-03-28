import React, { useState } from "react";
import { Post } from "@/types/Post";
import { User } from "@/types/User";
import PostReactions from "./PostReactions";

type Props = {
  currentUser: User;
  post: Post;
};

const PostButton: React.FC<Props> = ({ currentUser, post }) => {
  const [showReactions, setShowReactions] = useState(false);
  const [timeOutId, setTimeOutId] = useState<any>();
  return (
    <div className="relative flex items-stretch gap-1 py-1 border-t border-b border-solid border-gray-300 mx-4">
      {showReactions && (
        <PostReactions
          post={post}
          timeOutId={timeOutId}
          setTimeOutId={setTimeOutId}
          setShowReactions={setShowReactions}
        />
      )}
      <button
        className="relative flex-1 flex justify-center items-center gap-2 py-2 rounded-md hover:bg-gray-100"
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
        <i className="like_icon"></i>
        <span>Like</span>
      </button>
      <button className="flex-1 flex justify-center items-center gap-2 py-2 rounded-md hover:bg-gray-100">
        <i className="comment_icon"></i>
        <span>Comment</span>
      </button>
      <button className="flex-1 flex justify-center items-center gap-2 py-2 rounded-md hover:bg-gray-100">
        <i className="share_icon"></i>
        <span>Share</span>
      </button>
    </div>
  );
};

export default PostButton;
