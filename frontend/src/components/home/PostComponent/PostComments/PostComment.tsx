import { useState } from "react";
import { Link } from "react-router-dom";
import { Comment } from "@/types/Comment.type";
import Style from "./style.module.css";
import {
  useGetReactionByCommentIdAndUserIdQuery,
  useHandleReactionCommentMutation,
} from "@/store/api/reactionsApi";
import { getTimeDiff, isoStringToDate } from "@/helpers/date";
import ToolTip from "@/components/ToolTip";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/selectors/user";
import { Dots } from "@/svg";
import Tippy from "@tippyjs/react/headless";
import {
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "@/store/api/commentsApi";
import PostCreateComment from "./PostCreateComment";
import { Reaction } from "@/types/Reaction.type";
import reactions from "@/data/reactions";
import CommentReactions from "./CommentReactions";
import ToolTipReactions from "@/components/ToolTipReactions";
import { Post } from "@/types/Post.type";
type PropsComment = {
  post: Post;
  setLocalPost: React.Dispatch<React.SetStateAction<Post>>;
  comment: Comment;
  setEditCommentId: React.Dispatch<React.SetStateAction<string>>;
  editCommentId: string;
};
type PropsReactionsInfo = {
  comment: Comment;
  reactionsInfo: Record<string, number>;
};
type PropsCommentFunction = {
  comment: Comment;
  setEditCommentId: React.Dispatch<React.SetStateAction<string>>;
  deleteComment: any;
  post: Post;
  setLocalPost: React.Dispatch<React.SetStateAction<Post>>;
};
const ReactionsInfo: React.FC<PropsReactionsInfo> = ({
  comment,
  reactionsInfo,
}) => {
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
    <ToolTipReactions commentId={comment._id}>
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
    </ToolTipReactions>
  );
};
const CommentFunction: React.FC<PropsCommentFunction> = ({
  comment,
  setEditCommentId,
  deleteComment,
  post,
  setLocalPost,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const handleDeleteComment = async () => {
    try {
      const { post: newPost } = await deleteComment({
        commentId: comment._id,
      }).unwrap();
      setLocalPost({ ...post, commentsCount: newPost.commentsCount });
    } catch (error) {}
  };
  return (
    <Tippy
      popperOptions={{ modifiers: [{ name: "flip", enabled: false }] }}
      onClickOutside={() => {
        setShowTooltip(false);
      }}
      visible={showTooltip}
      placement="bottom"
      offset={[0, 10]}
      delay={300}
      interactive={true}
      render={(attrs) => (
        <div
          className="min-h-10 bg-white rounded-lg shadow3 p-2 flex flex-col w-[200px]"
          tabIndex={-1}
          {...attrs}
        >
          <button
            className="w-full rounded-md hover:bg-gray-200 transition-all duration-200 ease-linear p-2 text-[15px] font-medium leading-5 px-3 text-start"
            onClick={() => {
              setEditCommentId(comment._id);
            }}
          >
            Edit comment
          </button>
          <button
            className="w-full rounded-md hover:bg-gray-200 transition-all duration-200 ease-linear p-2 text-[15px] font-medium leading-5 px-3 text-start"
            onClick={async () => {
              await handleDeleteComment();
            }}
          >
            Delete comment
          </button>
        </div>
      )}
    >
      <div
        className=" h-8 w-8 rounded-full hover:bg-gray-200 transition-all duration-200 ease-linear cursor-pointer flex justify-center items-center"
        onClick={() => {
          setShowTooltip(!showTooltip);
        }}
      >
        <Dots width="16" height="16" />
      </div>
    </Tippy>
  );
};
const PostComment: React.FC<PropsComment> = ({
  post,
  setLocalPost,
  comment,
  setEditCommentId,
  editCommentId,
}) => {
  const [localComment, setLocalComment] = useState<Comment>(comment);
  const currentUser = useSelector(selectCurrentUser);
  // console.log(currentReaction);
  // Current reaction
  const {
    data: currentReaction,
    isLoading: currentReactionIsLoading,
    isFetching: currentReactionIsFetching,
  } = useGetReactionByCommentIdAndUserIdQuery({ commentId: comment._id });
  const [updateComment, { isLoading: commentIsBeingUpdated }] =
    useUpdateCommentMutation();
  const [deleteComment, { isLoading: commentIsBeingDeleted }] =
    useDeleteCommentMutation();

  const [handleReactionComment, { isLoading: isHandlingCommentReaction }] =
    useHandleReactionCommentMutation();
  const [showReactions, setShowReactions] = useState(false);
  const [timeOutId, setTimeOutId] = useState<any>();
  const handleButtonReactClick = async (
    commentId: string,
    reaction: string
  ) => {
    try {
      // Prevent spaming reaction
      if (currentReactionIsLoading || isHandlingCommentReaction) {
        return;
      }
      const newComment = await handleReactionComment({
        commentId,
        reaction,
      }).unwrap();
      setLocalComment({
        ...localComment,
        reactionsInfo: newComment.reactionsInfo,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="relative flex gap-1 mb-1 last:mb-0">
        {/* {hasChild && (
          <div className="absolute left-5 top-[44px] h-full w-[2px] bg-gray-900"></div>
        )} */}
        {showReactions && (
          <div className="w-full absolute bottom-0 -translate-y-6 left-8 z-10">
            <CommentReactions
              comment={localComment}
              timeOutId={timeOutId}
              setTimeOutId={setTimeOutId}
              setShowReactions={setShowReactions}
              handleButtonReactClick={handleButtonReactClick}
            />
          </div>
        )}
        {editCommentId !== localComment._id && (
          <>
            <Link
              to="/"
              className="relative w-10 h-10 rounded-full border border-solid border-gray-200 overflow-hidden hover--overlay"
            >
              <img
                src={localComment.user.picture}
                alt=""
                className="w-full h-full object-cover"
              />
            </Link>
            <div className="relative flex-1 flex flex-col mr-10">
              <div>
                <div className="flex gap-2 items-center">
                  <div className="flex flex-col rounded-xl bg-gray-100 py-2 px-3 w-fit">
                    <p className="text-sm font-medium">
                      {localComment.user.username}
                    </p>
                    <p className="text-[15px]">{localComment.text}</p>
                  </div>
                  {currentUser.id === localComment.user._id && (
                    <CommentFunction
                      comment={localComment}
                      setEditCommentId={setEditCommentId}
                      deleteComment={deleteComment}
                      post={post}
                      setLocalPost={setLocalPost}
                    />
                  )}
                </div>
                {localComment.image && (
                  <div className="my-1">
                    <img
                      src={localComment.image}
                      alt=""
                      className="max-h-[200px] w-auto rounded-xl"
                    />
                  </div>
                )}
                <div className="w-full items-center flex">
                  <div className="flex gap-3 px-3 items-center">
                    <button
                      className="flex items-center"
                      onMouseOver={() => {
                        clearTimeout(timeOutId);
                        setTimeOutId(
                          setTimeout(() => {
                            setShowReactions(true);
                          }, 500)
                        );
                      }}
                      onMouseLeave={() => {
                        clearTimeout(timeOutId);
                        setTimeOutId(
                          setTimeout(() => {
                            setShowReactions(false);
                          }, 500)
                        );
                      }}
                      onClick={async () => {
                        await handleButtonReactClick(localComment._id, "like");
                      }}
                    >
                      {!currentReaction && (
                        <span className="text-[12px] font-semibold hover:underline">
                          Like
                        </span>
                      )}
                      {currentReaction && (
                        <span
                          className="text-[12px] font-semibold hover:underline capitalize"
                          style={{
                            color: reactions[currentReaction?.reaction].color,
                          }}
                        >
                          {currentReaction.reaction}
                        </span>
                      )}
                    </button>
                    <button className="text-[12px] font-semibold hover:underline">
                      Reply
                    </button>
                    <ToolTip
                      title={isoStringToDate(
                        localComment.createdAt,
                        "EEEE, MMMM d, yyyy 'at' h:mm a"
                      )}
                    >
                      <span className="text-[12px] cursor-pointer hover:underline">
                        {getTimeDiff(new Date(localComment.createdAt))}
                      </span>
                    </ToolTip>
                  </div>
                  <ReactionsInfo
                    comment={localComment}
                    reactionsInfo={localComment.reactionsInfo}
                  />
                </div>
              </div>
            </div>
          </>
        )}
        {editCommentId === localComment._id && (
          <PostCreateComment
            autoFocus={true}
            key={localComment._id}
            post={post}
            setLocalPost={setLocalPost}
            currentUser={currentUser}
            updateComment={updateComment}
            commentIsBeingUpdated={commentIsBeingUpdated}
            replyTo={localComment.parrentComment || undefined}
            commentContent={localComment}
            setEditCommentId={setEditCommentId}
            setLocalComment={setLocalComment}
          />
        )}
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
