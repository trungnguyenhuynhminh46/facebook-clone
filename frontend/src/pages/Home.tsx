import React from "react";
import Header from "@components/Header";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/selectors/user";
import { stories } from "@/data/fakeStories";
import { useMediaQuery } from "react-responsive";
// Components
import LeftSidebar from "@/components/home/LeftSidebar";
import RightSidebar from "@/components/home/RightSidebar";
import Stories from "@/components/home/Stories";
import CreatePosts from "@/components/home/CreatePosts";

type Props = {};
const Home: React.FC<Props> = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1100px)" });
  const isMediumScreen = useMediaQuery({ query: "(max-width: 900px)" });
  const user = useSelector(selectCurrentUser);
  return (
    <div className="bg-[var(--bg-secondary)] min-h-screen">
      <Header />
      {!isTabletOrMobile && <LeftSidebar />}
      {!isMediumScreen && <RightSidebar currentUser={user} />}
      <div
        className="relative top-[56px] mx-auto mt-6 w-full max-w-[38.5vw]"
        style={
          isMediumScreen
            ? {
                width: "100%",
                maxWidth: "500px",
                marginRight: "auto",
                marginLeft: "auto",
              }
            : isTabletOrMobile
            ? {
                width: "100%",
                maxWidth: "500px",
                marginRight: "auto",
                marginLeft: "8vw",
              }
            : {}
        }
      >
        <div className="mx-4">
          <Stories currentUser={user} stories={stories} />
          <CreatePosts currentUser={user} />
        </div>
      </div>
    </div>
  );
};

export default Home;
