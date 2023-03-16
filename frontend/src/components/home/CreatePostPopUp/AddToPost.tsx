import { Dots, Feeling, Photo } from "@/svg";
import React from "react";
import { useMediaQuery } from "react-responsive";

type Props = {
  showPrev: boolean;
  setShowPrev: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddToPost: React.FC<Props> = ({ setShowPrev, showPrev }) => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 688px)" });
  return (
    <div className="flex justify-between items-center p-3 rounded-lg border border-solid border-gray-200 mt-5">
      <button className="text-sm font-medium">Add to your post</button>
      <div className="flex gap-2">
        <div
          className="cursor-pointer w-9 h-9 flex justify-center items-center bg-gray-200 hover:bg-gray-300 rounded-full"
          onClick={() => {
            setShowPrev(!showPrev);
          }}
          style={
            showPrev
              ? {
                  background: "rgb(209 213 219)",
                }
              : {}
          }
        >
          <Photo color="#45bd62" />
        </div>
        <div className="cursor-pointer w-9 h-9 flex justify-center items-center bg-gray-200 hover:bg-gray-300 rounded-full">
          <i className="tag_icon"></i>
        </div>
        <div className="cursor-pointer w-9 h-9 flex justify-center items-center bg-gray-200 hover:bg-gray-300 rounded-full">
          <Feeling color="#f7b928" />
        </div>
        {!isSmallScreen && (
          <>
            <div className="cursor-pointer w-9 h-9 flex justify-center items-center bg-gray-200 hover:bg-gray-300 rounded-full">
              <i className="maps_icon"></i>
            </div>
            <div className="cursor-pointer w-9 h-9 flex justify-center items-center bg-gray-200 hover:bg-gray-300 rounded-full">
              <i className="microphone_icon"></i>
            </div>
          </>
        )}

        <div className="cursor-pointer w-9 h-9 flex justify-center items-center bg-gray-200 hover:bg-gray-300 rounded-full">
          <Dots />
        </div>
      </div>
    </div>
  );
};

export default AddToPost;
