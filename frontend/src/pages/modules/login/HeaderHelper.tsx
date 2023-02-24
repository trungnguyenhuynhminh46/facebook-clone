import React, { useRef, useState } from "react";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import Tippy from "@tippyjs/react/headless";

type Props = {
  title?: string;
  children?: React.ReactNode;
};

const HeaderHelper: React.FC<Props> = ({
  title = "Title",
  children = "Content",
}) => {
  const [isShown, setIsShown] = useState(false);
  const contentRef = useRef(null);
  useOnClickOutside(contentRef, () => {
    setIsShown(!isShown);
  });
  return (
    <Tippy
      placement="left"
      visible={isShown}
      render={(attrs) => {
        return (
          <div className="helper-box z-50" tabIndex={-1} {...attrs}>
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
