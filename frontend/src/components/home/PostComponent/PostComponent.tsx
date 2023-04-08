import React, { useRef, useState } from "react";
import { User } from "@/types/User.type";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostButton from "./PostButton";
import PostInteract from "./PostInteract";
import PostComments from "./PostComments";
import { useSelector } from "react-redux";
import { selectPostById } from "@/store/slices/posts";
import { RootState } from "@/store/store";

type Props = {
  postId: string;
  currentUser: User;
};

const PostComponent: React.FC<Props> = ({ postId, currentUser }) => {
  const [showComments, setShowComments] = useState<boolean>(false);
  const post = useSelector((state: RootState) => selectPostById(state, postId));
  if (post) {
    return (
      <div className="w-full flex flex-col justify-start rounded-lg bg-white shadow2 mb-3">
        <PostHeader post={post} currentUser={currentUser} />
        <PostContent post={post} />
        <PostInteract post={post} setShowComments={setShowComments} />
        <PostButton post={post} currentUser={currentUser} />
        <PostComments
          post={post}
          currentUser={currentUser}
          showComments={showComments}
          setShowComments={setShowComments}
        />
      </div>
    );
  }
  return null;
};

export default PostComponent;
