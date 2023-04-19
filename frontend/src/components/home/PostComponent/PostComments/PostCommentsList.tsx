import { useState } from "react";
import PostComment from "./PostComment";
import { Comment } from "@/types/Comment.type";
import { Post } from "@/types/Post.type";
import PostCreateComment from "./PostCreateComment";
import {
  useAddCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "@/store/api/commentsApi";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/selectors/user";
type PropsCommentsList = {
  post: Post;
  setLocalPost: React.Dispatch<React.SetStateAction<Post>>;
  commentsList: Comment[];
};
const PostCommentsList: React.FC<PropsCommentsList> = ({
  post,
  setLocalPost,
  commentsList,
}) => {
  // console.log(commentsList);
  const [editCommentId, setEditCommentId] = useState("");
  const sortedCommentsList = commentsList.slice().sort((commenta, commentb) => {
    return commentb.createdAt.localeCompare(commenta.createdAt);
  });
  return (
    <>
      {sortedCommentsList.map((comment) => {
        return (
          <PostComment
            key={comment._id}
            comment={comment}
            setEditCommentId={setEditCommentId}
            editCommentId={editCommentId}
            post={post}
            setLocalPost={setLocalPost}
          />
        );
      })}
    </>
  );
};
export default PostCommentsList;
