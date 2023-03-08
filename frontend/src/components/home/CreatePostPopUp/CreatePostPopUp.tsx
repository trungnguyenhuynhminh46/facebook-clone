import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import Style from "./style.module.css";
import CreatePostsStyle from "./style.module.css";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { Dots, Feeling, Photo } from "@/svg";

type Props = {
  setIsShown: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: any;
};

const CreatePostPopUp: React.FC<Props> = ({ setIsShown, currentUser }) => {
  const formRef = useRef(null);
  const inputRef = useRef<any>(null);
  useOnClickOutside(formRef, () => {
    setIsShown(false);
  });
  // States
  const [inputText, setInputText] = useState("");
  return ReactDOM.createPortal(
    <>
      <div className="fixed inset-0 bg-gray-300 opacity-60 z-10" />
      <div className="fixed inset-0 flex justify-center items-center z-20">
        <div
          className="flex-1 relative mx-[30px] m-auto max-w-[500px] bg-white shadow2"
          ref={formRef}
        >
          <div className="relative flex justify-center py-4 border-b border-solid border-gray-200">
            <span className="text-xl font-semibold">Create Post</span>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-gray-200 hover:bg-gray-300 text-gray-500 flex justify-center items-center rounded-full"
              onClick={() => {
                setIsShown(false);
              }}
            >
              <i className="exit_icon"></i>
            </button>
          </div>
          <div className="flex flex-col items-stretch p-4">
            <div className="flex gap-3 items-center">
              <button className={CreatePostsStyle["avatar"]}>
                <img
                  src={currentUser.picture}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </button>
              <div className="flex flex-col gap-1 flex-1">
                <p>{currentUser.username}</p>
                <div className="flex flex-start">
                  <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-gray-300 cursor-pointer">
                    <img
                      src="/icons/public.png"
                      alt=""
                      className="w-3 h-3 shrink-0"
                    />
                    <span className="text-[12px]">Public</span>
                    <i className="arrowDown_icon shrink-0"></i>
                  </div>
                </div>
              </div>
            </div>
            <textarea
              ref={inputRef}
              placeholder={`What's on your mind, ${currentUser.first_name}`}
              className={`border-none outline-none min-h-[120px] max-h-[300px] pt-3 resize-none ${
                inputText.length > 75 ? "text-[16px]" : "text-[24px]"
              } ${
                inputRef.current &&
                inputRef.current.scrollHeight > 300 &&
                "overflow-y-scroll"
              }`}
              onChange={(e) => {
                setInputText(e.target.value);
                if (inputRef.current) {
                  inputRef.current.style.height = "120px";
                  inputRef.current.style.height =
                    inputRef.current.scrollHeight + "px";
                }
              }}
            />
            <div className="relative w-full h-[40px]">
              <img
                src="/icons/colorful.png"
                alt=""
                className="absolute left-0 w-10 h-10 cursor-pointer"
              />
              <i className="emoji_icon_large absolute right-0 top-1/2 -translate-y-1/2"></i>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg border border-solid border-gray-200 mt-5">
              <button className="text-sm font-medium">Add to your post</button>
              <div className="flex gap-2">
                <div className="cursor-pointer w-9 h-9 flex justify-center items-center bg-gray-200 hover:bg-gray-300 rounded-full">
                  <Photo color="#45bd62" />
                </div>
                <div className="cursor-pointer w-9 h-9 flex justify-center items-center bg-gray-200 hover:bg-gray-300 rounded-full">
                  <i className="tag_icon"></i>
                </div>
                <div className="cursor-pointer w-9 h-9 flex justify-center items-center bg-gray-200 hover:bg-gray-300 rounded-full">
                  <Feeling color="#f7b928" />
                </div>
                <div className="cursor-pointer w-9 h-9 flex justify-center items-center bg-gray-200 hover:bg-gray-300 rounded-full">
                  <i className="maps_icon"></i>
                </div>
                <div className="cursor-pointer w-9 h-9 flex justify-center items-center bg-gray-200 hover:bg-gray-300 rounded-full">
                  <i className="microphone_icon"></i>
                </div>
                <div className="cursor-pointer w-9 h-9 flex justify-center items-center bg-gray-200 hover:bg-gray-300 rounded-full">
                  <Dots />
                </div>
              </div>
            </div>
            <button
              className="w-full py-2 text-sm font-semibold text-gray-300 bg-gray-200 flex justify-center items-center mt-4 rounded-lg"
              style={
                inputText.length > 0
                  ? {
                      color: "white",
                      background: "var(--blue-color)",
                    }
                  : {}
              }
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")!
  );
};

export default CreatePostPopUp;
