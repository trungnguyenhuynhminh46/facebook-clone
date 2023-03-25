import React, { useState } from "react";
import CreatePostsStyle from "./style.module.css";
import { Feeling, LiveVideo, Photo } from "@/svg";
import CreatePostPopUp from "../CreatePostPopUp";
import { useMediaQuery } from "react-responsive";
import { User } from "@/types/User";

type Props = {
  currentUser: User;
};

const CreatePosts: React.FC<Props> = ({ currentUser }) => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 688px)" });
  const [isShown, setIsShown] = useState(false);
  const [inputText, setInputText] = useState("");
  return (
    <div className="w-full relative py-3 px-4 rounded-lg bg-white flex flex-col items-stretch mt-4 shadow2 mb-3">
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
          style={
            isSmallScreen
              ? {
                  fontSize: "12px",
                }
              : {}
          }
        >
          {inputText.trim()
            ? inputText.trim()
            : `What's on your mine, ${currentUser.first_name}?`}
        </button>
        {isShown && (
          <CreatePostPopUp
            setIsShown={setIsShown}
            currentUser={currentUser}
            inputText={inputText}
            setInputText={setInputText}
          />
        )}
      </div>
      <div className="w-full h-[1px] bg-gray-200 my-2"></div>
      <div className="flex items-center">
        <div
          className="flex-1 py-2 hover:bg-gray-200 text-[14px] text-gray-500 font-semibold flex justify-center items-center gap-2 rounded-lg transition-all duration-200 ease-linear cursor-pointer"
          style={
            isSmallScreen
              ? {
                  fontSize: "12px",
                }
              : {}
          }
        >
          <LiveVideo
            color="#f3425f"
            width={isSmallScreen ? "16px" : "25px"}
            height={isSmallScreen ? "16px" : "25px"}
          />
          Live Video
        </div>
        <div
          className="flex-1 py-2 hover:bg-gray-200 text-[14px] text-gray-500 font-semibold flex justify-center items-center gap-2 rounded-lg transition-all duration-200 ease-linear cursor-pointer"
          style={
            isSmallScreen
              ? {
                  fontSize: "12px",
                }
              : {}
          }
        >
          <Photo
            color="#4bbf67"
            width={isSmallScreen ? "16px" : "25px"}
            height={isSmallScreen ? "16px" : "25px"}
          />
          Photo/Video
        </div>
        <div
          className="flex-1 py-2 hover:bg-gray-200 text-[14px] text-gray-500 font-semibold flex justify-center items-center gap-2 rounded-lg transition-all duration-200 ease-linear cursor-pointer"
          style={
            isSmallScreen
              ? {
                  fontSize: "12px",
                }
              : {}
          }
        >
          <Feeling
            color="#f7b928"
            width={isSmallScreen ? "16px" : "25px"}
            height={isSmallScreen ? "16px" : "25px"}
          />
          Feeling/Activity
        </div>
      </div>
    </div>
  );
};

export default CreatePosts;
