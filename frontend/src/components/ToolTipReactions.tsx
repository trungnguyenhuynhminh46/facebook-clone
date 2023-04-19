import React, { useState } from "react";
import Tippy from "@tippyjs/react/headless";
import {
  useReactionDetailByCommentIdQuery,
  useReactionDetailByPostIdQuery,
} from "@/store/api/reactionsApi";
import { ClipLoader } from "react-spinners";

type Props = {
  commentId?: string;
  postId?: string;
  placement?: any;
  offset?: [number, number];
  children: any;
};

const ToolTipReactions: React.FC<Props> = ({
  commentId,
  postId,
  placement = "bottom",
  offset = [0, 6],
  children,
}) => {
  const [showReactionsDetail, setShowReactionsDetail] =
    useState<boolean>(false);
  if (postId) {
    const { data, isLoading, isFetching } = useReactionDetailByPostIdQuery(
      {
        postId,
      },
      { skip: !showReactionsDetail }
    );
    return (
      <Tippy
        placement={placement}
        offset={offset}
        delay={300}
        onShow={() => {
          setShowReactionsDetail(true);
        }}
        render={(attrs) => {
          if (!showReactionsDetail) {
            return null;
          }
          return (
            <div
              className="flex flex-col gap-1 py-[6px] px-[10px] bg-gray-800 opacity-90 text-gray-200 rounded-lg text-[12px]"
              {...attrs}
            >
              <>
                {isLoading && (
                  <ClipLoader
                    color={"gray"}
                    loading={isLoading}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                )}
                {!isLoading &&
                  !isFetching &&
                  data?.usernamesList &&
                  data.usernamesList.map((username, index) => {
                    return (
                      <p
                        key={index}
                        className="text-left text-sm text-gray-300"
                      >
                        {username}
                      </p>
                    );
                  })}
              </>
            </div>
          );
        }}
      >
        {children}
      </Tippy>
    );
  }
  if (commentId) {
    const { data, isLoading, isFetching } = useReactionDetailByCommentIdQuery(
      {
        commentId,
      },
      { skip: !showReactionsDetail }
    );
    return (
      <Tippy
        placement={placement}
        offset={offset}
        delay={300}
        onShow={() => {
          setShowReactionsDetail(true);
        }}
        render={(attrs) => {
          if (!showReactionsDetail) {
            return null;
          }
          return (
            <div
              className="flex flex-col gap-1 py-[6px] px-[10px] bg-gray-800 opacity-90 text-gray-200 rounded-lg text-[12px]"
              {...attrs}
            >
              <>
                {isLoading && (
                  <ClipLoader
                    color={"gray"}
                    loading={isLoading}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                )}
                {!isLoading &&
                  !isFetching &&
                  data?.usernamesList &&
                  data.usernamesList.map((username, index) => {
                    return (
                      <p
                        key={index}
                        className="text-left text-sm text-gray-300"
                      >
                        {username}
                      </p>
                    );
                  })}
              </>
            </div>
          );
        }}
      >
        {children}
      </Tippy>
    );
  }
  return children;
};

export default ToolTipReactions;
