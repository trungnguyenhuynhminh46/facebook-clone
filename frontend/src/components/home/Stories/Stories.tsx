import React, { useEffect, useRef, useState } from "react";
import Style from "./style.module.css";
import { ArrowRight, Plus } from "@/svg";

type Props = {
  currentUser: any;
  stories: any[];
};
type StoryItemProps = {
  story: any;
};

const StoryItem: React.FC<StoryItemProps> = ({ story }) => {
  return (
    <div className={Style["item"]}>
      {/* Back ground */}
      <div className={Style["background"]}>
        <img src={story.image} alt="" className={Style["background_image"]} />
      </div>
      {/* Avartar */}
      <div className={Style["avartar"]}>
        <img
          src={story.profile_picture}
          alt=""
          className={Style["avartar_image"]}
        />
      </div>
      {/* Title */}
      <p className={Style["title"]}>{story.profile_name}</p>
    </div>
  );
};

const Stories: React.FC<Props> = ({ currentUser, stories }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [left, setLeft] = useState(0);
  const [leftMax, setLeftMax] = useState(0);
  useEffect(() => {
    if (containerRef.current) {
      setLeftMax(
        containerRef.current.scrollWidth - containerRef.current.clientWidth
      );
    }
  }, [containerRef.current]);
  const handleNextButtonClick = () => {
    if (containerRef.current) {
      const width = containerRef.current.clientWidth;
      containerRef.current.scrollLeft += width;
      setLeft(containerRef.current.scrollLeft + width);
    }
  };
  const handlePrevButtonClick = () => {
    if (containerRef.current) {
      const width = containerRef.current.clientWidth;
      containerRef.current.scrollLeft -= width;
      setLeft(containerRef.current.scrollLeft - width);
    }
  };
  return (
    <div className={`${Style["carousel"]}`}>
      {left > 0 && (
        <button
          className={`${Style["btn"]} ${Style["btn--prev"]}`}
          onClick={handlePrevButtonClick}
        >
          <ArrowRight color="#65676b" />
        </button>
      )}
      {left < leftMax && (
        <button
          className={`${Style["btn"]} ${Style["btn--next"]}`}
          onClick={handleNextButtonClick}
        >
          <ArrowRight color="#65676b" />
        </button>
      )}

      <div className={`${Style["container"]}`} ref={containerRef}>
        <div className={Style["item"]}>
          {/* Back ground */}
          <div className={Style["background"]}>
            <img
              src={currentUser.picture}
              alt=""
              className={Style["background_image"]}
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
          return <StoryItem key={index} story={story} />;
        })}
      </div>
    </div>
  );
};

export default Stories;
