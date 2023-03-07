import React from "react";
import Header from "@components/Header";

type Props = {};
import LeftSidebar from "@/components/home/LeftSidebar";

const Home: React.FC<Props> = () => {
  return (
    <div className="bg-[var(--bg-secondary)] min-h-screen">
      <Header />
      <LeftSidebar />
    </div>
  );
};

export default Home;
