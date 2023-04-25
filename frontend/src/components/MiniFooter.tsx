import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const MiniFooter = (props: Props) => {
  return (
    <div className="text-[12px] text-[var(--color-secondary)] dark:text-[#b0b3b8]">
      <Link to="/">Privacy </Link>
      <span className="mr-2">. </span>
      <Link to="/">Terms </Link>
      <span className="mr-2">. </span>
      <Link to="/">Advertising </Link>
      <span className="mr-2">. </span>
      <Link to="/">
        Ad Choices <i className="ad_choices_icon"></i>{" "}
      </Link>
      <span className="mr-2">. </span>
      <Link to="/"></Link>Cookies <span>. </span>
      <Link to="/">More </Link>
      <span className="mr-2">. </span>
      Meta © 2022
    </div>
  );
};

export default MiniFooter;
