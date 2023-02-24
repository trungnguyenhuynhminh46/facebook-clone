import React, { useState } from "react";
import ErrorBox from "../../../components/ErrorBox";
import { useController } from "react-hook-form";
// Types
import { Control } from "react-hook-form/dist/types";

type Props = {
  type: string;
  placeholder: string;
  errorPosition: "top" | "left" | "right" | "bot";
  name: "email" | "password";
  control: Control<{ email: string; password: string }>;
  errorMessage?: string;
};

const RegisterTextInput: React.FC<Props> = ({
  type,
  placeholder,
  errorPosition,
  name,
  control,
  errorMessage = "",
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(true);
  // React-hook-form
  const {
    field,
    fieldState: { invalid, isTouched, isDirty },
    formState: { touchedFields, dirtyFields },
  } = useController({
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
          }`}
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
        />
        {errorMessage && !isFocus && (
          <i className="error_icon absolute right-[16px] top-1/2 -translate-y-1/2 z-10"></i>
        )}
        {field.value && isShowPassword && (
          <button
            className="cursor-pointer w-6 h-6 rounded-full hover:bg-[var(--color-eye-hover)] absolute right-[16px] top-1/2 -translate-y-1/2 flex justify-center items-center"
            onClick={() => {
              setIsShowPassword(false);
            }}
          >
            <i className="eye_open_icon"></i>
          </button>
        )}
        {field.value && !isShowPassword && (
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
      {isFocus && errorPosition === "bot" && errorMessage && (
        <div className="w-full flex justify-start">
          <ErrorBox type="bot" className="mb-1 mt-3">
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

export default RegisterTextInput;
