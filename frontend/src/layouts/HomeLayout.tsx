import Header from "@layouts/Header";
import React from "react";
import { Outlet } from "react-router-dom";

type Props = {};

const HomeLayout: React.FC<Props> = () => {
  return (
    <div className="bg-[var(--bg-secondary)] dark:bg-[#18191A] min-h-screen">
      <Header />
      <Outlet />
    </div>
  );
};

export default HomeLayout;
