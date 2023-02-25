import React, { useRef, useState } from "react";
import RegisterCheckbox from "./RegisterCheckbox";
import ErrorBox from "../../../components/ErrorBox";
import { Control } from "react-hook-form";
import Tippy from "@tippyjs/react/headless";
import HeaderHelper from "./HeaderHelper";
import useOnClickOutside from "../../../hooks/useOnClickOutside";

type Props = {
  control: Control<any>;
  errorPosition?: "top" | "left" | "right" | "bottom";
  errorMessage?: string;
};

const GenderSelector: React.FC<Props> = ({
  control,
  errorPosition = "left",
  errorMessage = "",
}) => {
  const containerRef = useRef(null);
  const [isShownError, setIsShownError] = useState(false);
  useOnClickOutside(containerRef, () => {
    setIsShownError(false);
  });
  return (
    <Tippy
      visible={isShownError}
      placement={errorPosition}
      offset={[18, -90]}
      render={(attrs) => (
        <ErrorBox type={errorPosition} {...attrs}>
          {errorMessage}
        </ErrorBox>
      )}
    >
      <div className="relative" ref={containerRef}>
        {errorMessage && !isShownError && (
          <span
            className="absolute cursor-pointer right-[10px] top-0 z-10 flex justify-center items-center"
            onClick={() => {
              setIsShownError(true);
            }}
          >
            <i className="error_icon"></i>
          </span>
        )}
        <HeaderHelper title="Gender">
          <div className="text-[#65676b] text-[13px] leading-[16px]">
            You can change who sees your gender on your profile later. Select
            Custom to choose another gender, or if you'd rather not say.
          </div>
        </HeaderHelper>
        <div className="grid grid-cols-3 gap-3">
          <RegisterCheckbox
            name="gender"
            control={control}
            title="Female"
            value="female"
            borderRed={!!errorMessage && !isShownError}
          />
          <RegisterCheckbox
            name="gender"
            control={control}
            title="Male"
            value="male"
            borderRed={!!errorMessage && !isShownError}
          />
          <RegisterCheckbox
            name="gender"
            control={control}
            title="Custom"
            value="custom"
            borderRed={!!errorMessage && !isShownError}
          />
        </div>
      </div>
    </Tippy>
  );
};

export default GenderSelector;
