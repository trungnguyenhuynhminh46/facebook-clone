import React from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

type Props = {
  onEmojiSelect: (emoji: any) => void;
  theme?: string;
};

const EmojiPicker: React.FC<Props> = ({ onEmojiSelect, theme = "auto" }) => {
  return (
    <Picker
      data={data}
      set="native"
      theme={theme}
      onEmojiSelect={onEmojiSelect}
    />
  );
};

export default EmojiPicker;
