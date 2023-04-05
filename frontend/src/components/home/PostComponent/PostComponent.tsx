import React from "react";
import { Post } from "@/types/Post.type";
import { User } from "@/types/User.type";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostButton from "./PostButton";
import PostInteract from "./PostInteract";
import PostComments from "./PostComments";
import PostCreateComment from "./PostCreateComment";
import { useSelector } from "react-redux";
import { selectPostById } from "@/store/slices/posts";
import { RootState } from "@/store/store";
import {
  useAddCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "@/store/api/commentsApi";

type Props = {
  postId: string;
  currentUser: User;
};

const PostComponent: React.FC<Props> = ({ postId, currentUser }) => {
  const post = useSelector((state: RootState) => selectPostById(state, postId));
  const [addComment, { isLoading: commentIsBeingAdded }] =
    useAddCommentMutation();
  const [updateComment, { isLoading: commentIsBeingUpdated }] =
    useUpdateCommentMutation();
  const [deleteComment, { isLoading: commentIsBeingDeleted }] =
    useDeleteCommentMutation();
  if (post) {
    return (
      <div className="w-full flex flex-col justify-start rounded-lg bg-white shadow2 mb-3">
        <PostHeader post={post} currentUser={currentUser} />
        <PostContent post={post} />
        <PostInteract post={post} />
        <PostButton post={post} currentUser={currentUser} />
        <PostCreateComment
          post={post}
          currentUser={currentUser}
          addComment={addComment}
          commentIsBeingAdded={commentIsBeingAdded}
        />
        <PostComments post={post} />
      </div>
    );
  }
  return null;
};

export default PostComponent;
