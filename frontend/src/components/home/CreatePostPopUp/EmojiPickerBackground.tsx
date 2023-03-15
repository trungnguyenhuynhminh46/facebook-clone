import React, { useEffect, useRef, useState } from "react";
import EmojiPicker from "@/components/EmojiPicker";
import useOnClickOutside from "@/hooks/useOnClickOutside";

type Props = {
  inputRef: React.RefObject<HTMLTextAreaElement>;
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  setCursorPosition: React.Dispatch<React.SetStateAction<number>>;
};

const EmojiPickerBackground: React.FC<Props> = ({
  inputRef,
  inputText,
  setInputText,
  setCursorPosition,
}) => {
  const emojiPickerRef = useRef(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
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
  return (
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
  );
};

export default EmojiPickerBackground;
