import { Dots, Feeling, Photo } from "@/svg";
import React from "react";
import { useMediaQuery } from "react-responsive";
import Style from "./style.module.css";

type Props = {
  showPrev: boolean;
  setShowPrev: React.Dispatch<React.SetStateAction<boolean>>;
  coverState:
    | {
        id: number;
        image: string;
        caretColor: string;
        color: string;
      }
    | undefined;
  imagesList: any[];
  tagedFriends: string[];
  isFeeling: string;
  checkedOutAt: string;
};

const AddToPost: React.FC<Props> = ({
  setShowPrev,
  showPrev,
  coverState,
  imagesList,
  tagedFriends,
  isFeeling,
  checkedOutAt,
}) => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 688px)" });
  return (
    <div className="flex justify-between items-center p-3 rounded-lg border border-solid border-gray-200 mt-5">
      <button className="text-base font-medium">Add to your post</button>
      <div className="flex gap-2">
        <button
          className={`${
            Style["add-post__btn"]
          } disabled:hover:!bg-transparent ${
            imagesList.length > 0 && "bg-[#45bd633c]"
          }`}
          disabled={!!coverState}
          onClick={() => {
            setShowPrev(true);
          }}
          style={
            showPrev
              ? {
                  background: "rgb(209 213 219)",
                }
              : {}
          }
        >
          <Photo
            color={`${!!coverState ? "var(--color-secondary)" : "#45bd62"}`}
          />
        </button>
        <button
          className={`${Style["add-post__btn"]} ${
            tagedFriends.length > 0 && "bg-[#1876f22b]"
          }`}
        >
          <i className="tag_icon"></i>
        </button>
        <button
          className={`${Style["add-post__btn"]} ${
            !!isFeeling && "bg-[#f7b9283c]"
          }`}
        >
          <Feeling color="#f7b928" />
        </button>
        {!isSmallScreen && (
          <>
            <button
              className={`${Style["add-post__btn"]} ${
                !!checkedOutAt && "bg-[#e74d3c3d]"
              }`}
            >
              <i className="maps_icon"></i>
            </button>
            {/* <div className={`${Style["add-post__btn"]} disabled:hover:bg-transparent`}>
              <i className="lifeEvent_icon"></i>
            </div> */}
          </>
        )}

        <button className={`${Style["add-post__btn"]}`}>
          <Dots />
        </button>
      </div>
    </div>
  );
};

export default AddToPost;
