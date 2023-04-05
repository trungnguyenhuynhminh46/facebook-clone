import { useState } from "react";
import { Link } from "react-router-dom";
import { Comment } from "@/types/Comment.type";
import Style from "./style.module.css";
import { useGetReactionByCommentIdAndUserIdQuery } from "@/store/api/reactionsApi";
// const reactionsInfo = {
//   like: 0,
//   love: 100,
//   haha: 20,
//   wow: 30,
//   sad: 40,
//   angry: 0,
// };

type PropsComment = {
  comment: Comment;
};
type PropsReactionsInfo = {
  reactionsInfo: {
    like: number;
    love: number;
    haha: number;
    wow: number;
    sad: number;
    angry: number;
  };
};
const ReactionsInfo: React.FC<PropsReactionsInfo> = ({ reactionsInfo }) => {
  const sortedReactions = Object.entries(reactionsInfo).sort(
    ([, a], [, b]) => b - a
  );
  // console.log(sortedReactions);
  const total = sortedReactions.reduce((sum, reaction) => {
    return sum + reaction[1];
  }, 0);
  if (total === 0) {
    return null;
  }
  return (
    <div
      className={`relative flex gap-1 items-center p-[1px] shadow4 rounded-full hover--overlay overflow-hidden cursor-pointer ${
        total > 20 ? "ml-auto" : ""
      }`}
    >
      <div className={`${Style["reactions-container"]}`}>
        {sortedReactions.slice(0, 3).map(([reaction, qty]) => {
          if (qty > 0) {
            return (
              <img
                key={reaction}
                src={`/reacts/${reaction}.svg`}
                className="w-[22px]"
                alt=""
              />
            );
          }
        })}
      </div>
      <span className="text-[var(--color-secondary)] text-[13px] mr-1">
        {total}
      </span>
    </div>
  );
};
const PostComment: React.FC<PropsComment> = ({ comment }) => {
  // const { data: currentReaction, isFetching: currentReactionIsFetching } =
  //   useGetReactionByCommentIdAndUserIdQuery({ commentId: comment._id });
  const [showReactions, setShowReactions] = useState(false);
  const [timeOutId, setTimeOutId] = useState<any>();
  // const handleButtonReactClick = async (
  //   commentId: string,
  //   reaction: string
  // ) => {
  //   try {
  //     // Prevent spaming reaction
  //     if (currentReactionIsFetching || isHandlingPostReaction) {
  //       return;
  //     }
  //     const newPost = await handleReactionPost({
  //       postId,
  //       reaction,
  //     }).unwrap();
  //     // Update post state
  //     dispatch(
  //       updatePost({
  //         id: newPost._id,
  //         changes: {
  //           reactions: newPost.reactions,
  //           reactionsInfo: newPost.reactionsInfo,
  //         },
  //       })
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <>
      <div className="flex gap-1 mb-1">
        {/* {hasChild && (
          <div className="absolute left-5 top-[44px] h-full w-[2px] bg-gray-900"></div>
        )} */}
        <Link
          to="/"
          className="relative w-10 h-10 rounded-full border border-solid border-gray-200 overflow-hidden hover--overlay"
        >
          <img
            src={comment.user.picture}
            alt=""
            className="w-full h-full object-cover"
          />
        </Link>
        <div className="relative flex-1 flex flex-col">
          <div>
            <div className="flex flex-col rounded-xl bg-gray-100 py-2 px-3 mb-1 w-fit">
              <p className="text-sm font-medium">{comment.user.username}</p>
              <p className="text-[15px]">{comment.text}</p>
            </div>
            {comment.image && (
              <div className="mb-1">
                <img
                  src={comment.image}
                  alt=""
                  className="max-h-[200px] w-auto rounded-xl"
                />
              </div>
            )}
            <div className="w-full items-center flex">
              <div className="flex gap-3 px-3 items-center">
                <button className="text-[12px] font-semibold hover:underline">
                  Like
                </button>
                <button className="text-[12px] font-semibold hover:underline">
                  Reply
                </button>
                <span className="text-[12px]">3h</span>
              </div>
              <ReactionsInfo reactionsInfo={comment.reactionsInfo} />
            </div>
          </div>
        </div>
      </div>
      {/* {hasChild && (
          <div className="ml-[48px]">
            <PostCommentsList />
          </div>
        )} */}
    </>
  );
};
export default PostComment;
