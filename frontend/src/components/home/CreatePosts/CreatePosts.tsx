import React, { useState } from "react";
import CreatePostsStyle from "./style.module.css";
import { Feeling, LiveVideo, Photo } from "@/svg";
import CreatePostPopUp from "../CreatePostPopUp";

type Props = {
  currentUser: any;
};

const CreatePosts: React.FC<Props> = ({ currentUser }) => {
  const [isShown, setIsShown] = useState(false);
  return (
    <div className="relative top-[56px] w-auto max-w-[590px] mx-auto py-3 px-4 rounded-lg bg-white flex flex-col items-stretch mt-4 shadow2">
      <div className="flex gap-3 items-center mb-2">
        <button className={CreatePostsStyle["avatar"]}>
          <img
            src={currentUser.picture}
            alt=""
            className="w-full h-full object-cover"
          />
        </button>
        <button
          className={CreatePostsStyle["open_create_post"]}
          onClick={() => {
            setIsShown(true);
          }}
        >
          What's on your mine, {currentUser.first_name}?
        </button>
        {isShown && (
          <CreatePostPopUp setIsShown={setIsShown} currentUser={currentUser} />
        )}
      </div>
      <div className="w-full h-[1px] bg-gray-200 my-2"></div>
      <div className="flex items-center">
        <div className="flex-1 py-2 hover:bg-gray-200 text-[14px] text-gray-500 font-semibold flex justify-center items-center gap-2 rounded-lg transition-all duration-200 ease-linear cursor-pointer">
          <LiveVideo color="#f3425f" />
          Live Video
        </div>
        <div className="flex-1 py-2 hover:bg-gray-200 text-[14px] text-gray-500 font-semibold flex justify-center items-center gap-2 rounded-lg transition-all duration-200 ease-linear cursor-pointer">
          <Photo color="#4bbf67" />
          Photo/Video
        </div>
        <div className="flex-1 py-2 hover:bg-gray-200 text-[14px] text-gray-500 font-semibold flex justify-center items-center gap-2 rounded-lg transition-all duration-200 ease-linear cursor-pointer">
          <Feeling color="#f7b928" />
          Feeling/Activity
        </div>
      </div>
    </div>
  );
};

export default CreatePosts;
