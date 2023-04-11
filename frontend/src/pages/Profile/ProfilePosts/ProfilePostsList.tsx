import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPostsIdsByEmail } from "@/store/slices/posts";
import { selectCurrentUser } from "@/store/selectors/user";
import PostComponent from "@/components/home/PostComponent/PostComponent";

type Props = {};

const ProfilePostsList = (props: Props) => {
  const currentUser = useSelector(selectCurrentUser);
  const { email } = useParams();
  const postsIds = useSelector((state) => selectPostsIdsByEmail(state, email));
  // console.log(postsIds);
  return (
    <>
      {!postsIds ||
        (postsIds.length === 0 && (
          <div className="text-center py-4 text-xl font-bold text-gray-400">
            No posts available yet
          </div>
        ))}
      {postsIds &&
        postsIds.length > 0 &&
        postsIds.map((postId) => {
          return (
            <PostComponent
              key={postId}
              postId={postId.toString()}
              currentUser={currentUser}
            />
          );
        })}
    </>
  );
};

export default ProfilePostsList;
