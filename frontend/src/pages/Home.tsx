import React from "react";
import Header from "@components/Header";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/selectors/user";
import { stories } from "@/data/fakeStories";
// Components
import LeftSidebar from "@/components/home/LeftSidebar";
import RightSidebar from "@/components/home/RightSidebar";
import Stories from "@/components/home/Stories";
import CreatePosts from "@/components/home/CreatePosts";

type Props = {};
const Home: React.FC<Props> = () => {
  const user = useSelector(selectCurrentUser);
  return (
    <div className="bg-[var(--bg-secondary)] min-h-screen">
      <Header />
      <LeftSidebar />
      <RightSidebar currentUser={user} />
      <Stories currentUser={user} stories={stories.slice(0, 4)} />
      <CreatePosts currentUser={user} />
    </div>
  );
};

export default Home;
