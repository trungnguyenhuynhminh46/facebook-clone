import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/selectors/user";
import PostComponent from "@/components/home/PostComponent/PostComponent";
import { useGetPostsByEmailQuery } from "@/store/api/postsApi";

type Props = {};

const ProfilePostsList = (props: Props) => {
  const currentUser = useSelector(selectCurrentUser);
  const { email } = useParams();
  const { data, isLoading, isFetching } = useGetPostsByEmailQuery({ email });
  return (
    <>
      {/* Loading ???  */}
      {!data ||
        (data?.posts.length === 0 && (
          <div className="text-center py-4 text-xl font-bold text-gray-400">
            No posts available yet
          </div>
        ))}
      {data?.posts &&
        data?.posts.length > 0 &&
        data?.posts.map((post) => {
          return (
            <PostComponent
              key={post._id}
              post={post}
              currentUser={currentUser}
            />
          );
        })}
    </>
  );
};

export default ProfilePostsList;
