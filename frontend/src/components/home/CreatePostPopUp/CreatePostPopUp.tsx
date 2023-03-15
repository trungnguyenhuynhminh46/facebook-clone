import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import CreatePostsStyle from "./style.module.css";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { Dots, Feeling, Photo } from "@/svg";
import { useMediaQuery } from "react-responsive";

import EmojiPickerBackground from "./EmojiPickerBackground";
import AddToPost from "./AddToPost";

type Props = {
  setIsShown: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: any;
};

const CreatePostPopUp: React.FC<Props> = ({ setIsShown, currentUser }) => {
  // States
  const [inputText, setInputText] = useState("");
  const [cursorPosition, setCursorPosition] = useState(0);
  const [showPrev, setShowPrev] = useState(false);

  const isSmallScreen = useMediaQuery({ query: "(max-width: 688px)" });
  const formRef = useRef(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  useOnClickOutside(formRef, () => {
    setIsShown(false);
  });
  useEffect(() => {
    inputRef.current!.selectionEnd = cursorPosition;
  }, [cursorPosition]);
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "unset";
    };
  }, []);
  return ReactDOM.createPortal(
    <>
      <div className="fixed inset-0 bg-gray-300 opacity-60 z-10" />
      <div className="fixed inset-0 flex justify-center items-center z-20">
        <div
          className="flex-1 relative mx-[30px] m-auto max-w-[500px] bg-white shadow2 rounded-lg"
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
            {!showPrev && (
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
                style={
                  isSmallScreen
                    ? {
                        fontSize: "20px",
                        minHeight: "100px",
                      }
                    : {}
                }
                onChange={(e) => {
                  setInputText(e.target.value);
                  if (inputRef.current) {
                    inputRef.current.style.height = "120px";
                    inputRef.current.style.height =
                      inputRef.current.scrollHeight + "px";
                  }
                }}
                value={inputText}
              />
            )}
            <EmojiPickerBackground
              inputRef={inputRef}
              setInputText={setInputText}
              inputText={inputText}
              setCursorPosition={setCursorPosition}
            />
            <AddToPost />
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
