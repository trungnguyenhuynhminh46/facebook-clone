import React from "react";
import RegisterDropDown from "./RegisterDropDown";
import { days, months, years } from "../../../data/date";

type Props = {
  dayName: string;
  monthName: string;
  yearName: string;
};

const DateSelector: React.FC<Props> = ({ dayName, monthName, yearName }) => {
  return (
    <div className="grid grid-cols-3 gap-3">
      <RegisterDropDown items={days} name={dayName} />
      <RegisterDropDown items={months} name={monthName} />
      <RegisterDropDown items={years} name={yearName} />
    </div>
  );
};

export default DateSelector;
