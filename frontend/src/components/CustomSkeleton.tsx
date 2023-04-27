import React from "react";
import Skeleton from "react-loading-skeleton";

type Props = {
  className?: string;
  width?: string;
  height?: string;
};

const CustomSkeleton: React.FC<Props> = ({ className, width, height }) => {
  return (
    <Skeleton
      width={width}
      height={height}
      className={className}
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
  );
};

export default CustomSkeleton;
