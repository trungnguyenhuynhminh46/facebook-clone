import React, { useRef } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import ReactDOM from "react-dom";
import useOnClickOutside from "@/hooks/useOnClickOutside";

type Props = {
  onEmojiSelect: (emoji: any) => void;
  theme?: string;
  setShowEmojiPicker: React.Dispatch<React.SetStateAction<boolean>>;
};

const EmojiPicker: React.FC<Props> = ({
  onEmojiSelect,
  theme = "auto",
  setShowEmojiPicker,
}) => {
  const ref = useRef(null);

  useOnClickOutside(ref, () => {
    setShowEmojiPicker(false);
  });
  return ReactDOM.createPortal(
    <div ref={ref}>
      <Picker
        data={data}
        set="native"
        theme={theme}
        onEmojiSelect={onEmojiSelect}
      />
    </div>,
    document.getElementById("emoji-picker")!
  );
};

export default EmojiPicker;
