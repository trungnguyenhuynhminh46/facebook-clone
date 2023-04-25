import React from "react";

type Props = {
  className?: string;
};

const chevonUp: React.FC<Props> = ({
  className = "fill-[#65676B] dark:fill-[#b0b3b8]",
}) => {
  return (
    <svg
      viewBox="0 0 20 20"
      width="1em"
      height="1em"
      className={`x1lliihq x1k90msu x2h7rmj x1qfuztq x198g3q0 x1qx5ct2 xw4jnvo ${className}`}
    >
      <path d="M15.47 12.2 10 6.727 4.53 12.2a.75.75 0 0 1-1.06-1.061l6-6a.751.751 0 0 1 1.06 0l6 6a.75.75 0 0 1-1.06 1.061z"></path>
    </svg>
  );
};

export default chevonUp;
