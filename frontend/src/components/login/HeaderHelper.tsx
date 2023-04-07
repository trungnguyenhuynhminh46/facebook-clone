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
  return (
    <div>
      <div className="inline-flex items-center gap-1">
        <span className="text-[12px] leading-5 mt-[2px]">{title}</span>
        <Tippy
          interactive={true}
          placement={isNotLargeScreen ? "top" : "left"}
          visible={isShown}
          onClickOutside={() => {
            setIsShown(false);
          }}
          render={(attrs) => {
            return (
              <div className={`helper-box z-50 `} tabIndex={-1} {...attrs}>
                {children}
              </div>
            );
          }}
        >
          <i
            className="info_icon cursor-pointer"
            title="Click for more information"
            onClick={() => {
              setIsShown((prev) => !prev);
            }}
          />
        </Tippy>
      </div>
    </div>
  );
};
export default HeaderHelper;
