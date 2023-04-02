import React, { useEffect, useState } from "react";
import _ from "lodash";
import { Post } from "@/types/Post";
import { User } from "@/types/User";
import { Reaction } from "@/types/Reaction.type";
import PostReactions from "./PostReactions";
import reactions from "@data/reactions";
import {
  useGetReactionByPostIdAndUserIdQuery,
  useHandleReactionPostMutation,
} from "@/store/api/reactionsApi";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updatePost } from "@store/slices/posts";

type Props = {
  currentUser: User;
  post: Post;
};

const PostButton: React.FC<Props> = ({ currentUser, post }) => {
  const dispatch = useDispatch();
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
      // Update post state
      dispatch(
        updatePost({
          id: newPost._id,
          changes: {
            reactions: newPost.reactions,
            reactionsInfo: newPost.reactionsInfo,
          },
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="relative flex items-stretch gap-1 py-1 border-t border-b border-solid border-gray-300 mx-4">
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
        className="relative flex-1 flex justify-center items-center gap-2 py-2 rounded-md hover:bg-gray-100"
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
            <i className="like_icon"></i>
            <span>Like</span>
          </>
        )}
      </button>
      <button className="flex-1 flex justify-center items-center gap-2 py-2 rounded-md hover:bg-gray-100">
        <i className="comment_icon"></i>
        <span>Comment</span>
      </button>
      <button className="flex-1 flex justify-center items-center gap-2 py-2 rounded-md hover:bg-gray-100">
        <i className="share_icon"></i>
        <span>Share</span>
      </button>
    </div>
  );
};

export default PostButton;
