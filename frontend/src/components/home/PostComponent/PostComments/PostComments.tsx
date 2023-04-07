import React, { useEffect, useState } from "react";
import { Post } from "@/types/Post.type";
import { Comment } from "@/types/Comment.type";
import { Link } from "react-router-dom";
import { useGetRootCommentsByPostIdQuery } from "@/store/api/commentsApi";
import ClipLoader from "react-spinners/ClipLoader";
import PostCommentsList from "./PostCommentsList";

type Props = {
  post: Post;
};

const PostComments: React.FC<Props> = ({ post }) => {
  const {
    data: rootComments,
    isFetching,
    isLoading,
  } = useGetRootCommentsByPostIdQuery({
    postId: post._id,
  });
  // console.log(rootComments);
  const [comments, setComments] = useState<Comment[]>([]);
  useEffect(() => {
    if (rootComments) {
      setComments(rootComments);
    }
  }, [rootComments]);
  if (!comments || comments.length === 0) {
    return null;
  }
  return (
    <>
      {!isFetching && !isLoading && (
        <div className="p-4 pt-0 pr-10">
          {/* Root comments */}
          <PostCommentsList commentsList={comments} />
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
