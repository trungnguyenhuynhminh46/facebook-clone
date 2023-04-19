import React from "react";
import { Post } from "@/types/Post.type";
import { User } from "@/types/User.type";
import {
  useAddCommentMutation,
  useGetRootCommentsByPostIdQuery,
} from "@/store/api/commentsApi";
import { ClipLoader } from "react-spinners";
import PostCommentsList from "./PostCommentsList";
import PostCreateComment from "./PostCreateComment";

type Props = {
  post: Post;
  currentUser: User;
  showComments: boolean;
  setShowComments: React.Dispatch<React.SetStateAction<boolean>>;
  setLocalPost: React.Dispatch<React.SetStateAction<Post>>;
};

const PostComments: React.FC<Props> = ({
  post,
  currentUser,
  showComments,
  setShowComments,
  setLocalPost,
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
  const [addComment, { isLoading: commentIsBeingAdded }] =
    useAddCommentMutation();
  return (
    <>
      <div className="my-2 mx-4">
        <PostCreateComment
          post={post}
          currentUser={currentUser}
          addComment={addComment}
          commentIsBeingAdded={commentIsBeingAdded}
          setLocalPost={setLocalPost}
        />
        {commentIsBeingAdded && (
          <span className="italic text-sm text-gray-600 px-12">Posting...</span>
        )}
      </div>
      {rootComments && rootComments.length > 0 && (
        <div className="p-4 pt-0 pr-10">
          {/* Root comments */}
          <PostCommentsList
            post={post}
            setLocalPost={setLocalPost}
            commentsList={rootComments}
          />
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
