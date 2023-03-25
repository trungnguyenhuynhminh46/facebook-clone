import { Post } from "@/types/Post";
import React from "react";
import PostHeader from "./PostHeader";
import { User } from "@/types/User";

type Props = {
  post: Post;
  currentUser: User;
};

const PostComponent: React.FC<Props> = ({ post, currentUser }) => {
  return (
    <div className="w-full flex flex-col justify-start rounded-lg bg-white shadow2 mb-3">
      <PostHeader post={post} currentUser={currentUser} />
      <div>content</div>
      <div>buttons</div>
      <div>comments</div>
    </div>
  );
};

export default PostComponent;
