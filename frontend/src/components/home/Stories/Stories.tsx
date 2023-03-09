import React from "react";
import storiesStyle from "./style.module.css";
import { Plus } from "@/svg";
import Slider from "react-slick";
import { useMediaQuery } from "react-responsive";

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
  const isBelowLargeScreen = useMediaQuery({ query: "(max-width: 1280px)" });
  const isSmallScreen = useMediaQuery({ query: "(max-width: 688px)" });
  var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: isSmallScreen ? 3 : isBelowLargeScreen ? 4 : 5,
    slidesToScroll: 1,
    arrows: true,
    draggable: false,
  };
  return (
    <div className={`${storiesStyle["story_wrapper"]}`}>
      <Slider {...settings} className="w-full">
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
      </Slider>
    </div>
  );
};

export default Stories;
