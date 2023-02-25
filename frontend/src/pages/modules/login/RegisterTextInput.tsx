import React, { useState } from "react";
import ErrorBox from "../../../components/ErrorBox";
import { useController } from "react-hook-form";
import Tippy from "@tippyjs/react/headless";
// Types
import { Control } from "react-hook-form/dist/types";

type Props = {
  type: string;
  placeholder: string;
  errorPosition: "top" | "left" | "right" | "bottom";
  name: string;
  control: Control<any>;
  errorMessage?: string;
};

const RegisterTextInput: React.FC<Props> = ({
  type,
  placeholder,
  errorPosition,
  errorMessage = "",
  name,
  control,
}) => {
  const [isFocus, setIsFocus] = useState(false);
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
    <Tippy
      visible={!!isFocus && !!errorMessage}
      placement={errorPosition}
      render={(attrs) => (
        <ErrorBox type={errorPosition} {...attrs}>
          {errorMessage}
        </ErrorBox>
      )}
    >
      <div className="w-full relative">
        <input
          type={type}
          placeholder={placeholder}
          className={`register-input ${
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
          <span className="absolute right-[10px] top-1/2 -translate-y-1/2 z-10 flex justify-center items-center">
            <i className="error_icon"></i>
          </span>
        )}
      </div>
    </Tippy>
  );
};

export default RegisterTextInput;
