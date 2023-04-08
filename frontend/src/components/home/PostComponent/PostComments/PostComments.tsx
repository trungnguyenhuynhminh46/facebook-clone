import React, { useEffect, useState } from "react";
import { Post } from "@/types/Post.type";
import { Comment } from "@/types/Comment.type";
import { Link } from "react-router-dom";
import { User } from "@/types/User.type";
import {
  useAddCommentMutation,
  useGetRootCommentsByPostIdQuery,
  useUpdateCommentMutation,
} from "@/store/api/commentsApi";
import { ClipLoader } from "react-spinners";
import PostCommentsList from "./PostCommentsList";
import PostCreateComment from "./PostCreateComment";

type Props = {
  post: Post;
  currentUser: User;
  showComments: boolean;
  setShowComments: React.Dispatch<React.SetStateAction<boolean>>;
};

const PostComments: React.FC<Props> = ({
  post,
  currentUser,
  showComments,
  setShowComments,
}) => {
  const {
    data: rootComments,
    isFetching,
    isLoading,
  } = useGetRootCommentsByPostIdQuery(
    {
      postId: post._id,
    },
    { skip: !showComments }
  );
  // rootComments && console.log(rootComments);
  const [addComment, { isLoading: commentIsBeingAdded }] =
    useAddCommentMutation();
  const [updateComment, { isLoading: commentIsBeingUpdated }] =
    useUpdateCommentMutation();
  return (
    <>
      <div className="my-2 mx-4">
        <PostCreateComment
          postId={post._id}
          currentUser={currentUser}
          addComment={addComment}
          commentIsBeingAdded={commentIsBeingAdded}
          updateComment={updateComment}
          commentIsBeingUpdated={commentIsBeingUpdated}
        />
      </div>
      {rootComments && rootComments.length > 0 && (
        <div className="p-4 pt-0 pr-10">
          {/* Root comments */}
          <PostCommentsList commentsList={rootComments} />
        </div>
      )}
      {isLoading && (
        <div className="p-4 pt-2 pr-10 flex justify-center items-center">
          <ClipLoader
            color={"gray"}
            loading={isLoading}
            size={16}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
    </>
  );
};

export default PostComments;
