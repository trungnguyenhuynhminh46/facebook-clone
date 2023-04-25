import React from "react";
interface Props {
  className?: string;
}
const ArrowRight: React.FC<Props> = ({
  className = "fill-[#65676B] dark:fill-[#b0b3b8]",
}) => {
  return (
    <svg width="20" height="20" className={className} viewBox="0 0 20 20">
      <g fillRule="nonzero">
        <path
          d="M456.751 364.501a1 1 0 001.415 1.415l5.208-5.209a1 1 0 000-1.414l-5.208-5.209a1.001 1.001 0 00-1.416 1.416l4.501 4.501-4.5 4.501z"
          transform="translate(-446 -350)"
        ></path>
        <path
          d="M449.334 361h12.812a1 1 0 100-2h-12.813a1 1 0 100 2z"
          transform="translate(-446 -350)"
        ></path>
      </g>
    </svg>
  );
};

export default ArrowRight;
