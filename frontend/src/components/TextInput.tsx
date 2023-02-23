import React from "react";

type Props = {
  type: string;
  placeholder: string;
};

const TextInput: React.FC<Props> = ({ type, placeholder }) => {
  return (
    <div className="w-full py-[6px]">
      <input type={type} placeholder={placeholder} className={`input`} />
    </div>
  );
};

export default TextInput;
