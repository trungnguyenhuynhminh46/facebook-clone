import React, { useState } from "react";
import ErrorBox from "./ErrorBox";
import { useController } from "react-hook-form";
import { Control } from "react-hook-form/dist/types";

type Props = {
  type: string;
  placeholder: string;
  errorPosition: "top" | "left" | "right" | "bottom";
  name: string;
  control: Control<any>;
  errorMessage?: string;
  className?: string;
};

const TextInput: React.FC<Props> = ({
  type,
  placeholder,
  errorPosition,
  name,
  control,
  errorMessage = "",
  className = "",
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  // React-hook-form
  const { field } = useController({
    name,
    control,
  });
  return (
    <div className="w-full relative">
      {isFocus && errorPosition === "top" && errorMessage && (
        <div className="w-full flex justify-end">
          <ErrorBox type="top" className="mb-1 mt-3">
            {errorMessage}
          </ErrorBox>
        </div>
      )}
      <div className="w-full py-[6px] relative">
        <input
          type={isShowPassword ? "text" : type}
          placeholder={placeholder}
          className={`input ${
            errorMessage &&
            !isFocus &&
            "border-red-500 shadow-none focus:border-red-500 focus:shadow-none"
          } ${className}`}
          onFocus={() => {
            setIsFocus(true);
          }}
          onChange={field.onChange}
          onBlur={() => {
            setIsFocus(false);
            field.onBlur();
          }}
          value={field.value}
          name={field.name}
          ref={field.ref}
          autoComplete="off"
        />
        {errorMessage && !isFocus && (
          <span className="absolute right-[10px] top-1/2 -translate-y-1/2 z-10 flex justify-center items-center">
            <i className="error_icon"></i>
          </span>
        )}
        {field.value && isShowPassword && type === "password" && (
          <button
            className="cursor-pointer w-6 h-6 rounded-full hover:bg-[var(--color-eye-hover)] absolute right-[16px] top-1/2 -translate-y-1/2 flex justify-center items-center"
            onClick={() => {
              setIsShowPassword(false);
            }}
          >
            <i className="eye_open_icon"></i>
          </button>
        )}
        {field.value && !isShowPassword && type === "password" && (
          <div
            className="cursor-pointer w-6 h-6 rounded-full hover:bg-[var(--color-eye-hover)] absolute right-[16px] top-1/2 -translate-y-1/2 flex justify-center items-center"
            onClick={() => {
              setIsShowPassword(true);
            }}
          >
            <i className="eye_close_icon"></i>
          </div>
        )}
      </div>
      {isFocus && errorPosition === "bottom" && errorMessage && (
        <div className="w-full flex justify-start">
          <ErrorBox type="bottom" className="mb-1 mt-3">
            {errorMessage}
          </ErrorBox>
        </div>
      )}
      {isFocus && errorPosition === "left" && errorMessage && (
        <ErrorBox
          type="left"
          className="absolute w-full left-0 top-1/2"
          style={{
            transform: "translate(calc(-100% - 10px), -50%)",
          }}
        >
          {errorMessage}
        </ErrorBox>
      )}
      {isFocus && errorPosition === "right" && errorMessage && (
        <ErrorBox
          type="right"
          className="absolute w-full right-0 top-1/2"
          style={{
            transform: "translate(calc(100% + 10px), -50%)",
          }}
        >
          {errorMessage}
        </ErrorBox>
      )}
    </div>
  );
};

export default TextInput;
