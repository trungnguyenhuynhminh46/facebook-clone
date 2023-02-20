import React from "react";
interface Props {
  color?: string;
}
const HomeActive: React.FC<Props> = ({ color = "#1b74e4" }) => {
  return (
    <svg fill={color} width="28" height="28" viewBox="0 0 28 28">
      <path d="M25.825 12.29l-.004-.004-10.794-9.349a1.514 1.514 0 00-1.038-.416 1.473 1.473 0 00-.988.391L2.175 12.29a1.24 1.24 0 00-.307 1.469c.211.456.699.72 1.201.72H5v9.25c0 .966.784 1.75 1.75 1.75H11a1 1 0 001-1v-6.17a.33.33 0 01.33-.33h3.34a.33.33 0 01.33.33v6.17a1 1 0 001 1h4.25a1.75 1.75 0 001.75-1.75v-9.25h1.931c.502 0 .99-.264 1.201-.72a1.24 1.24 0 00-.307-1.469"></path>
    </svg>
  );
};

export default HomeActive;
