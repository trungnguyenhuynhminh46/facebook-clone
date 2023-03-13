import React, { useRef, useState } from "react";
import { days, months, years } from "../../data/date";
import useOnClickOutside from "../../hooks/useOnClickOutside";
// Components
import RegisterDropDown from "./RegisterDropDown";
import HeaderHelper from "./HeaderHelper";
import Tippy from "@tippyjs/react/headless";
import ErrorBox from "../ErrorBox";
import { useWatch, Control } from "react-hook-form";
type Props = {
  dayName: string;
  monthName: string;
  yearName: string;
  control: Control<any>;
  errorPosition?: "top" | "left" | "right" | "bottom";
  errorMessage: string;
  setBirthDayError: React.Dispatch<React.SetStateAction<string>>;
};

const DateSelector: React.FC<Props> = ({
  dayName,
  monthName,
  yearName,
  control,
  errorPosition = "left",
  errorMessage,
  setBirthDayError,
}) => {
  const now = new Date();
  const watchBDay = useWatch({ control, name: "bDay" });
  const watchBMonth = useWatch({ control, name: "bMonth" });
  const watchBYear = useWatch({ control, name: "bYear" });

  const validateError = () => {
    if (
      !(watchBDay === now.getDate()) ||
      !(watchBMonth === now.getMonth() + 1) ||
      !(watchBYear === now.getFullYear())
    ) {
      const picked_date = new Date(watchBYear, watchBMonth - 1, watchBDay);
      const ageDifMs = Date.now() - picked_date.getTime();
      const ageDate = new Date(ageDifMs);
      const age = Math.abs(ageDate.getUTCFullYear() - 1970);
      if (age < 14) {
        setBirthDayError(
          "It looks like you've enetered the wrong info.Please make sure that you use your real date of birth."
        );
      } else if (age > 200) {
        setBirthDayError(
          "It looks like you've enetered the wrong info.Please make sure that you use your real date of birth."
        );
      } else {
        setBirthDayError("");
      }
    }
  };

  const containerRef = useRef(null);
  const [isShownError, setIsShownError] = useState(false);
  useOnClickOutside(containerRef, () => {
    validateError();
    setIsShownError(false);
  });
  return (
    <Tippy
      visible={isShownError && !!errorMessage}
      placement={errorPosition}
      offset={errorPosition === "left" ? [18, 10] : [-50, 10]}
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
        <HeaderHelper title="Date of birth">
          <div className="text-[#65676b] text-[13px] leading-[16px]">
            <b>Providing your birthday</b> helps make sure that you get the
            right Facebook experience for your age. If you want to change who
            sees this, go to the About section of your profile. For more
            details, please visit our{" "}
            <a className="text-[var(--blue-color)]" href="#">
              Privacy Policy
            </a>
            .
          </div>
        </HeaderHelper>
        <div className="grid grid-cols-3 gap-3">
          <RegisterDropDown
            items={days}
            name={dayName}
            control={control}
            borderRed={!!errorMessage && !isShownError}
          />
          <RegisterDropDown
            items={months}
            name={monthName}
            control={control}
            borderRed={!!errorMessage && !isShownError}
          />
          <RegisterDropDown
            items={years}
            name={yearName}
            control={control}
            borderRed={!!errorMessage && !isShownError}
          />
        </div>
      </div>
    </Tippy>
  );
};

export default DateSelector;
