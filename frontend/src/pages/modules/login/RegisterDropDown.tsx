import React from "react";

type Item = {
  content: string;
  value: any;
};

type Props = {
  defaultOption?: string;
  items: Item[];
  name: string;
};

const RegisterDropDown: React.FC<Props> = ({
  defaultOption = "",
  items,
  name,
}) => {
  return (
    <select
      name={name}
      id={name}
      className="w-full h-[36px] focus-visible:outline-none text-[15px] leading-[20px] text-[#1c1e21] pl-2 pr-5 border border-solid border-[#ccd0d5] rounded-[4px]"
      defaultValue={defaultOption ? "" : items[0].value}
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
  );
};

export default RegisterDropDown;
