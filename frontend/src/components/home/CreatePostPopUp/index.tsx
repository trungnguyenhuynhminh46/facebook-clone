import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { User } from "@/types/User";
// Forms
import MainForm from "../CreatePostPopUp/MainForm";

type Props = {
  setIsShown: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: User;
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
};

const CreatePostPopUp: React.FC<Props> = ({
  setIsShown,
  currentUser,
  inputText,
  setInputText,
}) => {
  const [currentForm, setCurrentForm] = useState("main");
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-10">
      <div className="absolute inset-0 bg-gray-300 opacity-60 z-10" />
      {currentForm === "main" && (
        <MainForm
          setIsShown={setIsShown}
          currentUser={currentUser}
          inputText={inputText}
          setInputText={setInputText}
          setCurrentForm={setCurrentForm}
        />
      )}
    </div>,
    document.getElementById("portal")!
  );
};

export default CreatePostPopUp;
