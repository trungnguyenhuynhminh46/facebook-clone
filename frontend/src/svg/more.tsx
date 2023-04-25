import React from "react";

type Props = {
  className?: string;
};

const More: React.FC<Props> = ({
  className = "fill-[#65676B] dark:fill-[#b0b3b8]",
}) => {
  return (
    <svg
      viewBox="0 0 28 28"
      className={`x1lliihq x1k90msu x2h7rmj x1qfuztq xcza8v6 ${className}`}
      height="28"
      width="28"
    >
      <path d="M23.5 4a1.5 1.5 0 110 3h-19a1.5 1.5 0 110-3h19zm0 18a1.5 1.5 0 110 3h-19a1.5 1.5 0 110-3h19zm0-9a1.5 1.5 0 110 3h-19a1.5 1.5 0 110-3h19z"></path>
    </svg>
  );
};

export default More;
