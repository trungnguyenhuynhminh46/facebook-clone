import React from "react";
import storiesStyle from "./style.module.css";
import { Plus } from "@/svg";

type Props = {
  currentUser: any;
  stories: any[];
};
type StoryProps = {
  story: any;
};

const Story: React.FC<StoryProps> = ({ story }) => {
  return (
    <div className={storiesStyle["story_item"]}>
      {/* Back ground */}
      <div className={storiesStyle["story_background"]}>
        <img
          src={story.image}
          alt=""
          className={storiesStyle["story_background_image"]}
        />
      </div>
      {/* Avartar */}
      <div className={storiesStyle["story_avartar"]}>
        <img
          src={story.profile_picture}
          alt=""
          className={storiesStyle["story_avartar_image"]}
        />
      </div>
      {/* Title */}
      <p className={storiesStyle["story_title"]}>{story.profile_name}</p>
    </div>
  );
};

const Stories: React.FC<Props> = ({ currentUser, stories }) => {
  return (
    <div className={storiesStyle["story_wrapper"]}>
      {/* <div className="cursor-pointer w-12 h-12 rounded-full bg-gray-200 transition-all duration-200 hover:bg-gray-300 flex justify-center items-center absolute left-4 top-1/2 -translate-y-1/2 z-10">
        <i className="right_icon rotate-180"></i>
      </div> */}
      <div className={storiesStyle["story_item"]}>
        {/* Back ground */}
        <div className={storiesStyle["story_background"]}>
          <img
            src={currentUser.picture}
            alt=""
            className={storiesStyle["story_background_image"]}
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-white text-center pt-7 pb-2 text-[12px] font-medium">
          Create story
        </div>
        <div className="absolute bottom-9 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex justify-center items-center text-white text-2xl border-4 border-solid border-white bg-[var(--blue-color)]">
          <Plus />
        </div>
      </div>
      {stories.map((story, index) => {
        return <Story key={index} story={story} />;
      })}
      <div className="cursor-pointer w-12 h-12 rounded-full bg-gray-200 transition-all duration-200 hover:bg-gray-300 flex justify-center items-center absolute right-4 top-1/2 -translate-y-1/2 z-10">
        <i className="right_icon"></i>
      </div>
    </div>
  );
};

export default Stories;
