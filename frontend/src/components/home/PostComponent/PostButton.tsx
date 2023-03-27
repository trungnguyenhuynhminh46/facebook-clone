import React from "react";
import { Post } from "@/types/Post";
import { User } from "@/types/User";

type Props = {
  currentUser: User;
  post: Post;
};

const PostButton: React.FC<Props> = ({ currentUser, post }) => {
  return (
    <div className="flex items-stretch gap-1 py-1 border-t border-b border-solid border-gray-300 mx-4">
      <button className="flex-1 flex justify-center items-center gap-2 py-2 rounded-md hover:bg-gray-100">
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
