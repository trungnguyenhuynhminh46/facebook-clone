import React from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import ReactDOM from "react-dom";

type Props = {
  onEmojiSelect: (emoji: any) => void;
  theme?: string;
};

const EmojiPicker: React.FC<Props> = ({ onEmojiSelect, theme = "auto" }) => {
  return ReactDOM.createPortal(
    <Picker
      data={data}
      set="native"
      theme={theme}
      onEmojiSelect={onEmojiSelect}
    />,
    document.getElementById("emoji-picker")!
  );
};

export default EmojiPicker;
