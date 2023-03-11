import Header from "@layouts/Header";
import React from "react";
import { Outlet } from "react-router-dom";

type Props = {};

const HomeLayout = (props: Props) => {
  return (
    <div className="bg-[var(--bg-secondary)] min-h-screen">
      <Header />
      <Outlet />
    </div>
  );
};

export default HomeLayout;
