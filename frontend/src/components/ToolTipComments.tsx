import React, { useState } from "react";
import Tippy from "@tippyjs/react/headless";
import { useCommentsDetailByPostIdQuery } from "@/store/api/commentsApi";
import ClipLoader from "react-spinners/ClipLoader";

type Props = {
  postId: string;
  placement?: any;
  offset?: [number, number];
  children: any;
};

const ToolTipComments: React.FC<Props> = ({
  postId,
  placement = "bottom",
  offset = [0, 6],
  children,
}) => {
  const [showCommentsDetail, setShowCommentsDetail] = useState(false);
  const { data, isLoading, isFetching } = useCommentsDetailByPostIdQuery(
    {
      postId,
    },
    { skip: !showCommentsDetail }
  );
  return (
    <Tippy
      placement={placement}
      offset={offset}
      delay={300}
      onShow={() => {
        setShowCommentsDetail(true);
      }}
      render={(attrs) => {
        if (!showCommentsDetail) {
          return null;
        }
        return (
          <div
            className="py-[6px] px-[10px] bg-gray-800 opacity-90 text-gray-200 rounded-lg text-[12px]"
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
                data?.usernamesList &&
                data.usernamesList.map((username, index) => {
                  return (
                    <p key={index} className="text-left text-sm text-gray-300">
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
};

export default ToolTipComments;
