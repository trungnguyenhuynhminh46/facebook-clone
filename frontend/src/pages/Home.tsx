import React from "react";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/selectors/user";
import { stories } from "@/data/fakeStories";
import { useMediaQuery } from "react-responsive";
import { useGetAllPostsQuery } from "@/store/api/postsApi";
// Components
import LeftSidebar from "@/components/home/LeftSidebar";
import RightSidebar from "@/components/home/RightSidebar";
import Stories from "@/components/home/Stories";
import CreatePosts from "@/components/home/CreatePosts";
import PostComponent from "@/components/home/PostComponent/PostComponent";

type Props = {};
const Home: React.FC<Props> = () => {
  const { data, isLoading, isFetching } = useGetAllPostsQuery();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1100px)" });
  const isMediumScreen = useMediaQuery({ query: "(max-width: 900px)" });
  const user = useSelector(selectCurrentUser);
  return (
    <>
      {!isTabletOrMobile && <LeftSidebar />}
      {!isMediumScreen && <RightSidebar currentUser={user} />}
      {isLoading && <div>Is loading...</div>}
      {!isLoading && data && (
        <div
          className="mx-auto pt-16 pb-4 w-full max-w-[38.5vw]"
          style={
            isMediumScreen
              ? {
                  width: "100%",
                  maxWidth: "700px",
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
            <CreatePosts currentUser={user} className="mt-4 mb-3" />
            {data.posts.map((post) => {
              return (
                <PostComponent key={post._id} post={post} currentUser={user} />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
