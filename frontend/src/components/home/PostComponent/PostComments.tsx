import React from "react";
import { Post } from "@/types/Post";
import { Link } from "react-router-dom";

type Props = {
  post: Post;
};

type PropsComment = {
  hasChild?: boolean;
};

type PropsCommentsList = {};

const PostComment: React.FC<PropsComment> = ({ hasChild = false }) => {
  return (
    <>
      <div className="flex gap-1 mb-1">
        {/* {hasChild && (
        <div className="absolute left-5 top-[44px] h-full w-[2px] bg-gray-900"></div>
      )} */}
        <Link
          to="/"
          className="relative w-10 h-10 rounded-full border border-solid border-gray-200 overflow-hidden hover--overlay"
        >
          <img
            src="https://images.unsplash.com/photo-1679844795701-4c7864627456?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=1000&q=60"
            alt=""
            className="w-full h-full object-cover"
          />
        </Link>
        <div className="relative flex-1 flex flex-col">
          <div>
            <div className="flex flex-col rounded-xl bg-gray-100 py-2 px-3 mb-1 w-fit">
              <p className="text-sm font-medium">Nguyễn Huỳnh Minh Trung</p>
              <p className="text-[15px]">
                bỏ fanpage này thì sau này tìm dịch truyện ở đâu ad
              </p>
            </div>
            <div className="mb-1">
              <img
                src="https://images.unsplash.com/photo-1679844795701-4c7864627456?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=1000&q=60"
                alt=""
                className="max-h-[200px] w-auto rounded-xl"
              />
            </div>
            <div className="flex gap-3 px-3 mb-1">
              <button className="text-[12px] font-semibold hover:underline">
                Like
              </button>
              <button className="text-[12px] font-semibold hover:underline">
                Reply
              </button>
              <span className="text-[12px]">3h</span>
            </div>
          </div>
        </div>
      </div>
      {hasChild && (
        <div className="ml-[48px]">
          <PostCommentsList />
        </div>
      )}
    </>
  );
};

const PostCommentsList = () => {
  return (
    <>
      <PostComment />
      <PostComment />
      <PostComment />
    </>
  );
};

const PostComments = (props: Props) => {
  return (
    <div className="p-4 pt-0 pr-10">
      {/* Root comments */}
      <PostComment hasChild={true} />
      <PostComment />
      <PostComment />
    </div>
  );
};

export default PostComments;
