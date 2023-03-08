import React from "react";
interface Props {}
const Plus: React.FC<Props> = () => {
  return (
    <svg width="20px" height="20px" fill="currentColor" viewBox="0 0 20 20">
      <g fillRule="nonzero">
        <path
          d="M449.5 361h13a1 1 0 100-2h-13a1 1 0 100 2z"
          transform="translate(-446 -350)"
        ></path>
        <path
          d="M457 366.5v-13a1 1 0 10-2 0v13a1 1 0 102 0z"
          transform="translate(-446 -350)"
        ></path>
      </g>
    </svg>
  );
};

export default Plus;
