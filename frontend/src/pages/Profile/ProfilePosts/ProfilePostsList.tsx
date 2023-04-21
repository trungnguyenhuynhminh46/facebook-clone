import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/selectors/user";
import PostComponent from "@/components/home/PostComponent/PostComponent";
import { useGetPostsByEmailQuery } from "@/store/api/postsApi";
import InfiniteScroll from "react-infinite-scroll-component";
import PostSkeleton from "@/components/skeleton/PostSkeleton";

type Props = {};

const ProfilePostsList = (props: Props) => {
  const currentUser = useSelector(selectCurrentUser);
  const { email } = useParams();
  // Data here
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const { data, isLoading, isFetching } = useGetPostsByEmailQuery({
    email,
    _page: page,
    _limit: limit,
  });
  const posts =
    data?.postsEntityState && Object.values(data?.postsEntityState.entities);
  const count = data?.count;
  return (
    <>
      {/* Loading ???  */}
      {!posts ||
        (posts.length === 0 && (
          <div className="text-center py-4 text-xl font-bold text-gray-400">
            No posts available yet
          </div>
        ))}
      {!!posts && !!count && posts.length > 0 && (
        <InfiniteScroll
          dataLength={posts.length}
          next={() => {
            setPage(page + 1);
          }}
          hasMore={posts.length < count}
          loader={<PostSkeleton />}
          endMessage={
            <p className="text-center text-lg text-gray-400 font-semibold pb-2">
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
                currentUser={currentUser}
              />
            );
          })}
        </InfiniteScroll>
      )}
    </>
  );
};

export default ProfilePostsList;
