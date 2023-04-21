import React, { useState } from "react";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/selectors/user";
import { stories } from "@/data/fakeStories";
import { useMediaQuery } from "react-responsive";
import { useGetPostsForHomePageQuery } from "@/store/api/postsApi";
// Components
import LeftSidebar from "@/components/home/LeftSidebar";
import RightSidebar from "@/components/home/RightSidebar";
import Stories from "@/components/home/Stories";
import CreatePosts from "@/components/home/CreatePosts";
import PostComponent from "@/components/home/PostComponent/PostComponent";
import InfiniteScroll from "react-infinite-scroll-component";
import PostSkeleton from "@/components/skeleton/PostSkeleton";
import { Post } from "@/types/Post.type";

type Props = {};
const Home: React.FC<Props> = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1100px)" });
  const isMediumScreen = useMediaQuery({ query: "(max-width: 900px)" });
  const user = useSelector(selectCurrentUser);
  // Data here
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const { data, isLoading, isFetching } = useGetPostsForHomePageQuery({
    _page: page,
    _limit: limit,
  });
  const posts =
    data?.postsEntityState && Object.values(data?.postsEntityState.entities);
  const count = data?.count;
  return (
    <>
      {!isTabletOrMobile && <LeftSidebar />}
      {!isMediumScreen && <RightSidebar currentUser={user} />}
      {/* {isLoading && <div>Is loading...</div>} */}

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

          {posts && count !== undefined && (
            <InfiniteScroll
              dataLength={posts.length}
              next={() => {
                setPage(page + 1);
              }}
              hasMore={posts.length < count}
              loader={<PostSkeleton />}
              endMessage={
                <p className="text-center text-lg text-gray-400 font-semibold pt-2">
                  You have seen it all!
                </p>
              }
            >
              {posts.map((post) => {
                if (!post) {
                  return null;
                }
                return (
                  <PostComponent
                    key={post._id}
                    post={post}
                    currentUser={user}
                  />
                );
              })}
            </InfiniteScroll>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
