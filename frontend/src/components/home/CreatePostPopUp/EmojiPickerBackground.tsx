import React, { useEffect, useRef, useState } from "react";
import EmojiPicker from "@/components/EmojiPicker";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { useMediaQuery } from "react-responsive";
import ImagePicker from "./ImagePicker";

type Props = {
  inputRef: React.RefObject<HTMLTextAreaElement>;
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  setCursorPosition: React.Dispatch<React.SetStateAction<number>>;
  currentUser: any;
  showPrev: boolean;
  setShowPrev: React.Dispatch<React.SetStateAction<boolean>>;
  imagesList: any[];
  setImagesList: React.Dispatch<React.SetStateAction<any[]>>;
};

const EmojiPickerBackground: React.FC<Props> = ({
  inputRef,
  inputText,
  setInputText,
  setCursorPosition,
  currentUser,
  showPrev,
  setShowPrev,
  imagesList,
  setImagesList,
}) => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 688px)" });
  const emojiPickerRef = useRef(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  useEffect(() => {
    if (showPrev && inputRef.current) {
      inputRef.current.style.height = "auto";
    }
  }, [showPrev]);
  useOnClickOutside(emojiPickerRef, () => {
    setShowEmojiPicker(false);
  });
  const handleEmojiSelect = (emoji: any) => {
    const ref = inputRef.current;
    if (ref) {
      const start = inputText.substring(0, ref.selectionStart);
      const end = inputText.substring(ref.selectionEnd);
      const newText = start + emoji.native + end;
      setInputText(newText);
      setCursorPosition(start.length + emoji.native.length);
    }
  };
  // Styles
  const inputFontSize = !showPrev
    ? isSmallScreen
      ? "text-[20px]"
      : inputText.length <= 75
      ? "text-[24px]"
      : "text-base"
    : "text-base";
  const inputOverFlow = !showPrev
    ? inputRef.current &&
      inputRef.current.scrollHeight > 300 &&
      "overflow-y-scroll"
    : "";
  const inputMinHeight = !showPrev
    ? isSmallScreen
      ? "min-h-[100px]"
      : "min-h-[120px]"
    : "";
  const inputMaxHeight = !showPrev ? "max-h-[300px]" : "";
  return (
    <div
      className={`relative ${
        showPrev ? "h-[344px] overflow-y-scroll -mr-4 custom-scrollbar" : ""
      }`}
    >
      <textarea
        ref={inputRef}
        placeholder={`What's on your mind, ${currentUser.first_name}`}
        className={`w-full border-none outline-none pt-3 resize-none ${inputFontSize} ${inputOverFlow} ${inputMinHeight} ${inputMaxHeight}`}
        onChange={(e) => {
          setInputText(e.target.value);
          // Change textarea height by text content
          if (!showPrev && inputRef.current) {
            inputRef.current.style.height = "120px";
            inputRef.current.style.height =
              inputRef.current.scrollHeight + "px";
          }
          if (showPrev && inputRef.current) {
            inputRef.current.style.height = "auto";
            inputRef.current.style.height =
              inputRef.current.scrollHeight + "px";
          }
        }}
        value={inputText}
      />
      {showPrev && (
        <div ref={emojiPickerRef} className="absolute right-0 top-4 z-10">
          <i
            className="emoji_icon_large absolute right-0 top-1/2 -translate-y-1/2"
            onClick={() => {
              setShowEmojiPicker(!showEmojiPicker);
            }}
          ></i>
          {showEmojiPicker && (
            <div className="absolute right-0 top-0 -translate-x-8 -translate-y-4 select-none">
              <EmojiPicker onEmojiSelect={handleEmojiSelect} />
            </div>
          )}
        </div>
      )}
      {!showPrev && (
        <div className="relative w-full h-[40px]">
          <img
            src="/icons/colorful.png"
            alt=""
            className="absolute left-0 w-10 h-10 cursor-pointer"
          />
          <div ref={emojiPickerRef}>
            <i
              className="emoji_icon_large absolute right-0 top-1/2 -translate-y-1/2"
              onClick={() => {
                setShowEmojiPicker(!showEmojiPicker);
              }}
            ></i>
            {showEmojiPicker && (
              <div className="absolute right-0 top-0 -translate-y-1/2 -translate-x-10 select-none">
                <EmojiPicker onEmojiSelect={handleEmojiSelect} />
              </div>
            )}
          </div>
        </div>
      )}
      {showPrev && (
        <ImagePicker
          setShowPrev={setShowPrev}
          imagesList={imagesList}
          setImagesList={setImagesList}
        />
      )}
    </div>
  );
};

export default EmojiPickerBackground;
