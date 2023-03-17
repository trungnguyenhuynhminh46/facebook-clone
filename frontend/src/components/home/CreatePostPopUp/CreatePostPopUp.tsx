import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import CreatePostsStyle from "./style.module.css";
import useOnClickOutside from "@/hooks/useOnClickOutside";

import EmojiPickerBackground from "./EmojiPickerBackground";
import AddToPost from "./AddToPost";

type Props = {
  setIsShown: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: any;
};

const CreatePostPopUp: React.FC<Props> = ({ setIsShown, currentUser }) => {
  const formRef = useRef(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  // States
  const [inputText, setInputText] = useState("");
  const [cursorPosition, setCursorPosition] = useState(0);
  const [showPrev, setShowPrev] = useState(false);
  const [imagesList, setImagesList] = useState<any[]>([]);
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
    <div className="fixed inset-0 z-10">
      <div className="absolute inset-0 bg-gray-300 opacity-60 z-10" />
      <div className="absolute inset-0 flex justify-center items-center z-20">
        <div
          className="flex-1 relative mx-[30px] m-auto max-w-[500px]"
          ref={formRef}
        >
          <div
            className="absolute top-[100px] right-[50px] z-30"
            id="emoji-picker"
          ></div>
          <div
            className="w-full bg-white shadow2 rounded-lg overflow-y-auto custom-scrollbar"
            style={{
              maxHeight: "calc(100vh - 16px)",
            }}
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
                <div className="flex flex-col flex-1">
                  <p className="text-[15px] font-semibold">
                    {currentUser.username}
                  </p>
                  <div className="flex flex-start">
                    <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-gray-200 cursor-pointer">
                      <img
                        src="/icons/public.png"
                        alt=""
                        className="w-3 h-3 shrink-0"
                      />
                      <span className="text-[12px] font-semibold">Public</span>
                      <i className="arrowDown_icon shrink-0 mb-1"></i>
                    </div>
                  </div>
                </div>
              </div>
              <EmojiPickerBackground
                inputRef={inputRef}
                setInputText={setInputText}
                inputText={inputText}
                setCursorPosition={setCursorPosition}
                currentUser={currentUser}
                showPrev={showPrev}
                setShowPrev={setShowPrev}
                imagesList={imagesList}
                setImagesList={setImagesList}
              />
              <AddToPost setShowPrev={setShowPrev} showPrev={showPrev} />
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
      </div>
    </div>,
    document.getElementById("portal")!
  );
};

export default CreatePostPopUp;
