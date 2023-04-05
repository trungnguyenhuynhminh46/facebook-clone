import PostComment from "./PostComment";
import { Comment } from "@/types/Comment.type";
type PropsCommentsList = {
  commentsList: Comment[];
};
const PostCommentsList: React.FC<PropsCommentsList> = ({ commentsList }) => {
  console.log(commentsList);
  return (
    <>
      {commentsList.map((comment) => {
        return <PostComment key={comment._id} comment={comment} />;
      })}
    </>
  );
};
export default PostCommentsList;
