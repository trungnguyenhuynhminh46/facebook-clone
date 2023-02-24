import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  type?: string;
  style?: object;
};

const ErrorBox: React.FC<Props> = ({
  children,
  className = "",
  type = "top",
  style = {},
}) => {
  return (
    <div
      className={`
  ${type === "top" && "error-box error-box--top"} 
  ${type === "bot" && "error-box error-box--bot"} 
  ${type === "left" && "error-box error-box--left"} 
  ${type === "right" && "error-box error-box--right"} 
  ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default ErrorBox;
