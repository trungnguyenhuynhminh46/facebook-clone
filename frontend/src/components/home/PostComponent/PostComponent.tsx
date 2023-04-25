import React, { useState } from "react";
import { User } from "@/types/User.type";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostButton from "./PostButton";
import PostInteract from "./PostInteract";
import PostComments from "./PostComments";
import { Post } from "@/types/Post.type";

type Props = {
  currentUser: User;
  post: Post;
};

const PostComponent: React.FC<Props> = ({ currentUser, post }) => {
  const [localPost, setLocalPost] = useState<Post>(post);
  const [showComments, setShowComments] = useState<boolean>(false);
  if (post) {
    return (
      <div className="w-full flex flex-col justify-start rounded-lg bg-white dark:bg-[#242526] shadow2 mb-3">
        <PostHeader post={localPost} currentUser={currentUser} />
        <PostContent post={localPost} />
        <PostInteract post={localPost} setShowComments={setShowComments} />
        <PostButton
          post={localPost}
          currentUser={currentUser}
          setLocalPost={setLocalPost}
        />
        <PostComments
          post={localPost}
          currentUser={currentUser}
          showComments={showComments}
          setShowComments={setShowComments}
          setLocalPost={setLocalPost}
        />
      </div>
    );
  }
  return null;
};

export default PostComponent;
