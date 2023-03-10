import React from "react";
import { Link } from "react-router-dom";

type Props = {
  beforeIcon: string;
  children: React.ReactNode;
  moveTo?: () => void;
  to?: string;
  onClick?: () => void;
};

const MenuItem: React.FC<Props> = ({
  beforeIcon,
  children,
  moveTo,
  to,
  onClick,
}) => {
  const Container = to ? Link : "button";
  return (
    <Container
      to={to || ""}
      className="flex gap-3 items-center p-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 w-full last:mb-2"
      onClick={onClick || moveTo}
    >
      <div className="w-9 h-9 rounded-full bg-gray-200 flex justify-center items-center flex-shrink-0">
        <i className={beforeIcon}></i>
      </div>
      <span className="text-[15px] font-medium">{children}</span>
      {moveTo && <i className="right_icon flex-shrink-0 ml-auto"></i>}
    </Container>
  );
};

export default MenuItem;
