import React, { useState } from "react";
import _ from "lodash";
import { Post } from "@/types/Post.type";
import { User } from "@/types/User.type";
import PostReactions from "./PostReactions";
import reactions from "@data/reactions";
import {
  useGetReactionByPostIdAndUserIdQuery,
  useHandleReactionPostMutation,
} from "@/store/api/reactionsApi";

type Props = {
  currentUser: User;
  post: Post;
  setLocalPost: React.Dispatch<React.SetStateAction<Post>>;
};

const PostButton: React.FC<Props> = ({ currentUser, post, setLocalPost }) => {
  const { data: currentReaction, isFetching: currentReactionIsFetching } =
    useGetReactionByPostIdAndUserIdQuery({ postId: post._id });
  const [handleReactionPost, { isLoading: isHandlingPostReaction }] =
    useHandleReactionPostMutation();
  // console.log(data);
  const [showReactions, setShowReactions] = useState(false);
  const [timeOutId, setTimeOutId] = useState<any>();
  const handleButtonReactClick = async (postId: string, reaction: string) => {
    try {
      // Prevent spaming reaction
      if (currentReactionIsFetching || isHandlingPostReaction) {
        return;
      }
      const newPost = await handleReactionPost({
        postId,
        reaction,
      }).unwrap();
      // Update local state
      setLocalPost({
        ...post,
        reactionsInfo: newPost.reactionsInfo,
        reactions: newPost.reactions,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="relative flex items-stretch gap-1 py-1 border-t border-b border-solid border-gray-300 dark:border-[#3E4042] mx-4">
      {showReactions && (
        <PostReactions
          post={post}
          timeOutId={timeOutId}
          setTimeOutId={setTimeOutId}
          setShowReactions={setShowReactions}
          handleButtonReactClick={handleButtonReactClick}
        />
      )}
      <button
        className="relative flex-1 flex justify-center items-center gap-2 py-2 rounded-md hover--overlay overflow-hidden"
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
          await handleButtonReactClick(post._id, "like");
        }}
      >
        {!!currentReaction && (
          <>
            <img
              src={`/reacts/${currentReaction.reaction}.svg`}
              className="w-[18px] h-[18px]"
              alt=""
            />
            <span
              className={`capitalize font-semibold`}
              style={{ color: reactions[currentReaction?.reaction].color }}
            >
              {currentReaction.reaction}
            </span>
          </>
        )}
        {!currentReaction && (
          <>
            <i className="like_icon dark:invert"></i>
            <span className="dark:text-[#b0b3b8]">Like</span>
          </>
        )}
      </button>
      <button className="relative flex-1 flex justify-center items-center gap-2 py-2 rounded-md hover--overlay overflow-hidden">
        <i className="comment_icon dark:invert"></i>
        <span className="dark:text-[#b0b3b8]">Comment</span>
      </button>
      <button className="relative flex-1 flex justify-center items-center gap-2 py-2 rounded-md hover--overlay overflow-hidden">
        <i className="share_icon dark:invert"></i>
        <span className="dark:text-[#b0b3b8]">Share</span>
      </button>
    </div>
  );
};

export default PostButton;
