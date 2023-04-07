import { useState } from "react";
import PostComment from "./PostComment";
import { Comment } from "@/types/Comment.type";
import PostCreateComment from "./PostCreateComment";
import {
  useAddCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "@/store/api/commentsApi";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/selectors/user";
type PropsCommentsList = {
  commentsList: Comment[];
};
const PostCommentsList: React.FC<PropsCommentsList> = ({ commentsList }) => {
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
          />
        );
      })}
    </>
  );
};
export default PostCommentsList;
