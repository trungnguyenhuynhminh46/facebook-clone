import React, { useRef, useState } from "react";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { Control } from "react-hook-form/dist/types/form";
import { useController } from "react-hook-form";
import Tippy from "@tippyjs/react/headless";
import ErrorBox from "../../../components/ErrorBox";

type Item = {
  content: string;
  value: any;
};

type Props = {
  defaultOption?: string;
  items: Item[];
  borderRed?: boolean;
  name: string;
  control: Control<any>;
  onChange?: () => void;
  errorPosition?: "top" | "left" | "right" | "bottom";
  errorMessage?: string;
};

const RegisterDropDown: React.FC<Props> = ({
  defaultOption = "",
  items,
  borderRed = false,
  name,
  control,
  onChange = () => {},
  errorPosition = "left",
  errorMessage = "",
}) => {
  const containerRef = useRef(null);
  const [isShownError, setIsShownError] = useState(false);
  useOnClickOutside(containerRef, () => {
    setIsShownError(false);
  });
  // React hook form
  const {
    field,
    fieldState: { invalid, isTouched, isDirty },
    formState: { touchedFields, dirtyFields },
  } = useController({
    name,
    control,
    rules: { required: true },
  });
  return (
    <Tippy
      visible={isShownError}
      placement={errorPosition}
      offset={[6, 10]}
      render={(attrs) => (
        <ErrorBox type={errorPosition} {...attrs}>
          {errorMessage}
        </ErrorBox>
      )}
    >
      <div className="relative" ref={containerRef}>
        {errorMessage && !isShownError && (
          <span
            className="absolute right-[16px] top-1/2 -translate-y-1/2 z-10 flex justify-center items-center"
            onClick={() => {
              setIsShownError(!isShownError);
            }}
          >
            <i className="error_icon"></i>
          </span>
        )}
        <select
          id={name}
          className={`w-full h-[36px] focus-visible:outline-none text-[15px] leading-[20px] text-[#1c1e21] pl-2 pr-5 border border-solid border-[#ccd0d5] rounded-[4px] ${
            (borderRed || (errorMessage && !isShownError)) && "border-red-500"
          }`}
          onClick={() => {
            setIsShownError(!isShownError);
          }}
          onChange={(e) => {
            onChange();
            field.onChange(e);
          }}
          onBlur={field.onBlur}
          value={field.value || ""}
          name={field.name}
          ref={field.ref}
        >
          <option value="" disabled>
            {defaultOption}
          </option>
          {items.map((item) => {
            return (
              <option key={item.value} value={item.value}>
                {item.content}
              </option>
            );
          })}
        </select>
      </div>
    </Tippy>
  );
};

export default RegisterDropDown;
