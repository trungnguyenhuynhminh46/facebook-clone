import React, { useEffect, useState } from "react";
import _ from "lodash";
import { Post } from "@/types/Post";
import { User } from "@/types/User";
import { Reaction } from "@/types/Reaction.type";
import PostReactions from "./PostReactions";
import reactions from "@data/reactions";
import {
  useAddReactionMutation,
  useUpdateReactionMutation,
  useDeleteReactionMutation,
} from "@/store/api/reactionsApi";
import axios from "axios";

type Props = {
  currentUser: User;
  post: Post;
};

const PostButton: React.FC<Props> = ({ currentUser, post }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [addReaction] = useAddReactionMutation();
  const [updateReaction] = useUpdateReactionMutation();
  const [deleteReaction] = useDeleteReactionMutation();
  const [currentReaction, setCurrentReaction] = useState<Reaction | null>(null);
  const refetchCurrentReaction = async () => {
    if (isLoading) {
      return;
    }
    try {
      setIsLoading(true);
      const {
        data: { data: defaultReaction },
      } = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/reactions/getReactionByPostIdAndUserId/${post._id}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      // console.log(defaultReaction);
      setCurrentReaction(defaultReaction);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    refetchCurrentReaction();
  }, []);
  const [showReactions, setShowReactions] = useState(false);
  const [timeOutId, setTimeOutId] = useState<any>();
  const handleButtonLikeClick = async () => {
    if (!!currentReaction) {
      await deleteReaction({ reactionId: currentReaction?._id });
      // Update state
      setCurrentReaction(null);
    }
    if (!currentReaction) {
      await addReaction({
        postId: post._id,
        reaction: "like",
      });
      // Update state
      await refetchCurrentReaction();
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
          await handleButtonLikeClick();
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
