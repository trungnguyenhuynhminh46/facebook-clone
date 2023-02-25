import React from "react";
import { Control, useController } from "react-hook-form";

type Props = {
  name: string;
  control: Control<any>;
  title: string;
  value: any;
  borderRed?: boolean;
};

const RegisterCheckbox: React.FC<Props> = ({
  name,
  control,
  title,
  value,
  borderRed = false,
}) => {
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
    <label
      className={`w-full h-[36px] p-2 text-[15px] leading-[20px] text-[#1c1e21] border border-solid border-[#ccd0d5] rounded-[4px] flex justify-between items-center ${
        borderRed && "border-red-500"
      }`}
    >
      <span>{title}</span>
      <input
        type="radio"
        onChange={field.onChange}
        onBlur={field.onBlur}
        name={field.name}
        ref={field.ref}
        value={value}
      />
    </label>
  );
};

export default RegisterCheckbox;
