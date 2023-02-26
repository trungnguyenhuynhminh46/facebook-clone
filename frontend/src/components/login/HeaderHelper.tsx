import React, { useRef, useState } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { useMediaQuery } from "react-responsive";
import Tippy from "@tippyjs/react/headless";

type Props = {
  title?: string;
  children?: React.ReactNode;
};

const HeaderHelper: React.FC<Props> = ({
  title = "Title",
  children = "Content",
}) => {
  const isNotLargeScreen = useMediaQuery({
    query: "(max-width: 1024px)",
  });
  const [isShown, setIsShown] = useState(false);
  const contentRef = useRef(null);
  useOnClickOutside(contentRef, () => {
    setIsShown(false);
  });
  return (
    <Tippy
      placement={isNotLargeScreen ? "top" : "left"}
      visible={isShown}
      render={(attrs) => {
        return (
          <div className={`helper-box z-50 `} tabIndex={-1} {...attrs}>
            {children}
          </div>
        );
      }}
    >
      <div>
        <div className="inline-flex items-center gap-1" ref={contentRef}>
          <span className="text-[12px] leading-5 mt-[2px]">{title}</span>
          <i
            className="info_icon cursor-pointer"
            title="Click for more information"
            onClick={() => {
              setIsShown((prev) => !prev);
            }}
          />
        </div>
      </div>
    </Tippy>
  );
};
export default HeaderHelper;
