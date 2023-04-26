import React from "react";
import Skeleton from "react-loading-skeleton";

type Props = {};

const PostSkeleton = (props: Props) => {
  return (
    <div className="w-full rounded-lg bg-white mb-3">
      {/* Header */}
      <div className="flex items-center py-3 px-4 gap-2">
        {/* Avatar */}
        <div className="h-10 w-10 rounded-full border border-solid border-gray-300">
          <Skeleton circle className="w-full h-full -translate-y-1" />
        </div>
        {/* Detail */}
        <div className="flex flex-col">
          <Skeleton width={200} />
          <Skeleton width={200} />
        </div>
      </div>
      {/* Content */}
      <Skeleton width="100%" height={200} />
      {/* Comment */}
      <div className="py-2 px-4 flex gap-2">
        <div className="w-8 h-8 rounded-full border border-solid border-gray-300 overflow-hidden">
          <Skeleton className="w-full h-full -translate-y-1" />
        </div>
        <Skeleton
          height="100%"
          className="-translate-y-1 rounded-full"
          containerClassName="w-full max-w-[420px]"
        />
      </div>
    </div>
  );
};

export default PostSkeleton;
