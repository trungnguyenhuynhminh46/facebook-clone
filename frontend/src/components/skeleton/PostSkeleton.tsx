import React from "react";
import Skeleton from "react-loading-skeleton";

type Props = {};

const PostSkeleton = (props: Props) => {
  return (
    <div className="w-full rounded-lg bg-white dark:bg-[#242526] mb-3">
      {/* Header */}
      <div className="flex items-center py-3 px-4 gap-2">
        {/* Avatar */}
        <div className="h-10 w-10 rounded-full border border-solid border-gray-300 dark:border-[#3E4042]">
          <Skeleton
            circle
            className="w-full h-full -translate-y-1"
            baseColor={
              document.documentElement.className.includes("dark")
                ? "#3E4042"
                : "#ebebeb"
            }
            highlightColor={
              document.documentElement.className.includes("dark")
                ? "#74767a"
                : "#f5f5f5"
            }
          />
        </div>
        {/* Detail */}
        <div className="flex flex-col">
          <Skeleton
            width={200}
            baseColor={
              document.documentElement.className.includes("dark")
                ? "#3E4042"
                : "#ebebeb"
            }
            highlightColor={
              document.documentElement.className.includes("dark")
                ? "#74767a"
                : "#f5f5f5"
            }
          />
          <Skeleton
            width={200}
            baseColor={
              document.documentElement.className.includes("dark")
                ? "#3E4042"
                : "#ebebeb"
            }
            highlightColor={
              document.documentElement.className.includes("dark")
                ? "#74767a"
                : "#f5f5f5"
            }
          />
        </div>
      </div>
      {/* Content */}
      <Skeleton
        width="100%"
        height={200}
        baseColor={
          document.documentElement.className.includes("dark")
            ? "#3E4042"
            : "#ebebeb"
        }
        highlightColor={
          document.documentElement.className.includes("dark")
            ? "#74767a"
            : "#f5f5f5"
        }
      />
      {/* Comment */}
      <div className="py-2 px-4 flex gap-2">
        <div className="w-8 h-8 rounded-full border border-solid border-gray-300 dark:border-[#3E4042] overflow-hidden">
          <Skeleton
            className="w-full h-full -translate-y-1"
            baseColor={
              document.documentElement.className.includes("dark")
                ? "#3E4042"
                : "#ebebeb"
            }
            highlightColor={
              document.documentElement.className.includes("dark")
                ? "#74767a"
                : "#f5f5f5"
            }
          />
        </div>
        <Skeleton
          height="100%"
          className="-translate-y-1 rounded-full"
          containerClassName="w-full max-w-[420px]"
          baseColor={
            document.documentElement.className.includes("dark")
              ? "#3E4042"
              : "#ebebeb"
          }
          highlightColor={
            document.documentElement.className.includes("dark")
              ? "#74767a"
              : "#f5f5f5"
          }
        />
      </div>
    </div>
  );
};

export default PostSkeleton;
