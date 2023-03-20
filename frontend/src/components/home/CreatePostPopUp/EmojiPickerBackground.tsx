import React, { useEffect, useRef, useState } from "react";
import EmojiPicker from "@/components/EmojiPicker";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { useMediaQuery } from "react-responsive";
import ImagePicker from "./ImagePicker";
import { ChevonDown } from "@/svg";
import covers from "@data/covers";

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
  coverState:
    | {
        id: number;
        image: string;
        caretColor: string;
        color: string;
      }
    | undefined;
  setCoverState: React.Dispatch<
    React.SetStateAction<
      | {
          id: number;
          image: string;
          caretColor: string;
          color: string;
        }
      | undefined
    >
  >;
  setError: React.Dispatch<React.SetStateAction<string>>;
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
  coverState,
  setCoverState,
  setError,
}) => {
  const isVerySmallScreen = useMediaQuery({ query: "(max-width: 414px)" });
  const isSmallScreen = useMediaQuery({ query: "(max-width: 688px)" });
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showCoverPicker, setShowCoverPicker] = useState(false);
  const [showCoverPickerIcon, setShowCoverPickerIcon] = useState(true);
  useEffect(() => {
    if (showPrev && inputRef.current) {
      inputRef.current.style.height = "auto";
    }
  }, [showPrev]);
  useEffect(() => {
    if (inputText.length === 0) {
      setShowCoverPickerIcon(true);
    }
    if (inputText.length > 70) {
      setShowCoverPickerIcon(false);
      setShowCoverPicker(false);
      setCoverState(undefined);
    }
  }, [inputText]);
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
      className={`${
        coverState && "-ml-4 -mr-4 mt-4 flex justify-center"
      } relative ${
        showPrev ? "h-[344px] overflow-y-scroll -mr-4 custom-scrollbar" : ""
      }`}
    >
      {coverState && (
        <img
          src={`/images/postBackgrounds/${coverState.image}`}
          className="w-full h-auto"
          alt=""
        />
      )}
      <textarea
        ref={inputRef}
        placeholder={`What's on your mind, ${currentUser.first_name}`}
        className={`${
          coverState &&
          `absolute top-1/2 -translate-y-1/2 text-center text-[30px] font-bold bg-transparent max-w-[80%]`
        } w-full border-none outline-none pt-3 resize-none ${inputFontSize} ${inputOverFlow} ${inputMinHeight} ${inputMaxHeight}`}
        style={
          coverState
            ? {
                color: coverState.color,
                caretColor: coverState.caretColor,
                opacity: 0.9,
              }
            : {}
        }
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
        <div className="absolute right-0 top-4 z-10">
          <i
            className="emoji_icon_large absolute right-0 top-1/2 -translate-y-1/2"
            onClick={() => {
              setShowEmojiPicker(!showEmojiPicker);
            }}
          ></i>
          {showEmojiPicker && (
            <EmojiPicker
              onEmojiSelect={handleEmojiSelect}
              setShowEmojiPicker={setShowEmojiPicker}
            />
          )}
        </div>
      )}
      {!showPrev && (
        <div
          className={` w-full h-[40px] ${
            coverState ? "absolute bottom-3 left-4" : "relative"
          } flex justify-start items-center`}
          style={
            coverState
              ? {
                  maxHeight: "calc(100% - 32px)",
                }
              : {}
          }
        >
          {showCoverPickerIcon && showCoverPicker && (
            <div className="flex gap-2 items-center">
              <div
                className="w-8 h-8 rounded-lg bg-gray-200 cursor-pointer flex justify-center items-center rotate-90"
                onClick={() => {
                  setShowCoverPicker(false);
                }}
              >
                <ChevonDown />
              </div>
              <div
                className={`w-[35px] h-[35px] rounded-lg box-border cursor-pointer flex justify-center items-center rotate-90 border-[3px] border-solid border-transparent overflow-hidden ${
                  !coverState && "!border-white shadow2"
                }`}
                onClick={() => {
                  setCoverState(undefined);
                }}
              >
                <div className="bg-gray-200 w-full h-full"></div>
              </div>
              {covers
                .slice(0, isVerySmallScreen ? 2 : isSmallScreen ? 4 : 7)
                .map((cover) => {
                  return (
                    <div
                      key={cover.id}
                      className={`w-[35px] h-[35px] rounded-lg box-border flex justify-center items-center overflow-hidden cursor-pointer border-[3px] border-solid border-transparent ${
                        coverState &&
                        coverState.id == cover.id &&
                        "!border-white shadow2"
                      }`}
                      onClick={() => {
                        setCoverState(cover);
                      }}
                    >
                      <img
                        src={`/images/postBackgrounds/${cover.image}`}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  );
                })}
              <div className="w-8 h-8 rounded-lg bg-gray-200 cursor-pointer flex justify-center items-center rotate-90">
                <i className="window_icon"></i>
              </div>
            </div>
          )}
          {showCoverPickerIcon && !showCoverPicker && (
            <img
              src="/icons/colorful.png"
              alt=""
              className="absolute left-0 w-10 h-10 cursor-pointer"
              onClick={() => {
                setShowCoverPicker(true);
              }}
            />
          )}

          <div className="ml-auto flex justify-center items-center">
            <i
              className="emoji_icon_large"
              onClick={() => {
                setShowEmojiPicker(!showEmojiPicker);
              }}
            ></i>
            {showEmojiPicker && (
              <EmojiPicker
                onEmojiSelect={handleEmojiSelect}
                setShowEmojiPicker={setShowEmojiPicker}
              />
            )}
          </div>
        </div>
      )}
      {showPrev && (
        <ImagePicker
          setShowPrev={setShowPrev}
          imagesList={imagesList}
          setImagesList={setImagesList}
          setError={setError}
        />
      )}
    </div>
  );
};

export default EmojiPickerBackground;
