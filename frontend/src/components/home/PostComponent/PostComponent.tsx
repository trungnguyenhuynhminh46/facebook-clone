import React from "react";
import { Post } from "@/types/Post";
import { User } from "@/types/User";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostButton from "./PostButton";
import PostInteract from "./PostInteract";
import PostComments from "./PostComments";

type Props = {
  post: Post;
  currentUser: User;
};

const PostComponent: React.FC<Props> = ({ post, currentUser }) => {
  return (
    <div className="w-full flex flex-col justify-start rounded-lg bg-white shadow2 mb-3">
      <PostHeader post={post} currentUser={currentUser} />
      <PostContent post={post} />
      <PostInteract post={post} />
      <PostButton post={post} currentUser={currentUser} />
      <PostComments />
    </div>
  );
};

export default PostComponent;
