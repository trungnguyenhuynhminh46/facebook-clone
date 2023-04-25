import React, { useEffect, useRef, useState } from "react";
import CreatePostsStyle from "./style.module.css";
import useOnClickOutside from "@/hooks/useOnClickOutside";

import EmojiPickerBackground from "./EmojiPickerBackground";
import AddToPost from "./AddToPost";
import BeatLoader from "react-spinners/BeatLoader";
import uploadImages from "@/helpers/upload";
import { User } from "@/types/User.type";
import {
  useAddPostMutation,
  useUpdatePostMutation,
} from "@/store/api/postsApi";

type Props = {
  setIsShown: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: User;
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  setCurrentForm: React.Dispatch<React.SetStateAction<string>>;
};

const MainForm: React.FC<Props> = ({
  setIsShown,
  currentUser,
  inputText,
  setInputText,
  setCurrentForm,
}) => {
  const [handleAddPost, { isLoading: postIsBeingAdded }] = useAddPostMutation();
  const [handleUpdatePost, { isLoading: postIsBeingUpdated }] =
    useUpdatePostMutation();
  const formRef = useRef(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  // States
  const [err, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [isSharedTo, setIsSharedTo] = useState<string>("public");
  const [showPrev, setShowPrev] = useState(false);
  const [imagesList, setImagesList] = useState<any[]>([]);
  const [coverState, setCoverState] = useState<
    | {
        id: number;
        image: string;
        caretColor: string;
        color: string;
      }
    | undefined
  >();
  const [tagedFriends, setTagedFriends] = useState<string[]>([]);
  const [isFeeling, setIsFeeling] = useState<string>("");
  const [checkedOutAt, setCheckedOutAt] = useState<string>("");
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
  const handleSubmitPost = async () => {
    if (!loading) {
      setLoading(true);
      // type: cover
      if (coverState) {
        try {
          await handleAddPost({
            type: "cover",
            user: currentUser.id,
            text: inputText,
            coverId: coverState.id,
            imagesList: [],
            isSharedTo: "public",
            isFeeling: "",
            checkedOutAt: "",
            tagedFriends: [],
          }).unwrap();
        } catch (error: any) {
          console.log(error);
          setError("Something went wrong, please try again!");
          setLoading(false);
          return;
        }
      }
      // type: withImages
      else if (imagesList.length > 0) {
        try {
          // Upload images
          const imagesUrl = await uploadImages(
            imagesList,
            `${currentUser.email}/postsImages`,
            currentUser.token
          );
          if (typeof imagesList === "string") {
            setError(imagesList);
            setLoading(false);
            return;
          }
          await handleAddPost({
            type: "withImages",
            user: currentUser.id,
            text: inputText,
            coverId: undefined,
            imagesList: imagesUrl,
            isSharedTo: "public",
            isFeeling: "",
            checkedOutAt: "",
            tagedFriends: [],
          }).unwrap();
        } catch (error: any) {
          console.log(error);
          setError("Something went wrong, please try again!");
          setLoading(false);
          return;
        }
      }
      // type: textOnly
      else if (inputText) {
        try {
          await handleAddPost({
            type: "onlyText",
            user: currentUser.id,
            text: inputText,
            coverId: undefined,
            imagesList: [],
            isSharedTo: "public",
            isFeeling: "",
            checkedOutAt: "",
            tagedFriends: [],
          }).unwrap();
        } catch (error) {
          console.log(error);
          setError("Something went wrong, please try again!");
          setLoading(false);
          return;
        }
      }
      if (!inputText) {
        setError("Please enter input");
        setLoading(false);
        return;
      }
      setError("");
      setLoading(false);
      setIsShown(false);
      setInputText("");
    }
  };
  return (
    <div className="absolute inset-0 flex justify-center items-center z-20">
      <div
        className="flex-1 relative mx-[30px] m-auto max-w-[500px]"
        ref={formRef}
      >
        <div
          className="absolute top-[100px] right-[50px] z-30"
          id="emoji-picker"
        ></div>
        {err && (
          <div className="absolute inset-0 bg-white dark:bg-[#242526] opacity-90 z-40 flex items-center justify-center">
            <div className="flex gap-4 justify-center items-center mx-14">
              <span className="text-red-500 text-base">{err}</span>
              <button
                className="bg-blue-600 text-white text-sm font-medium cursor-pointer rounded-lg py-2 px-3"
                onClick={() => {
                  setError("");
                }}
              >
                Try again
              </button>
            </div>
          </div>
        )}
        <div
          className="w-full bg-white dark:bg-[#242526] shadow2 rounded-lg overflow-y-auto custom-scrollbar"
          style={{
            maxHeight: "calc(100vh - 16px)",
          }}
        >
          <div className="relative flex justify-center py-4 border-b border-solid border-gray-200 dark:border-[#ffffff23]">
            <span className="text-xl font-semibold dark:text-[#E4E6EB]">
              Create Post
            </span>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-gray-200 dark:bg-[#3A3B3C] hover--overlay overflow-hidden text-gray-500 flex justify-center items-center rounded-full"
              onClick={() => {
                setIsShown(false);
              }}
            >
              <i className="exit_icon scale-90 dark:invert"></i>
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
                <p className="text-[15px] font-semibold dark:text-[#E4E6EB]">
                  {currentUser.username}
                </p>
                <div className="flex flex-start">
                  <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-gray-200 dark:bg-[#3A3B3C] cursor-pointer">
                    {isSharedTo === "public" && (
                      <>
                        <img
                          src="/icons/public.png"
                          alt=""
                          className="w-3 h-3 shrink-0 dark:invert"
                        />
                        <span className="text-[12px] font-semibold dark:text-[#E4E6EB]">
                          Public
                        </span>
                      </>
                    )}

                    <i className="arrowDown_icon shrink-0 mb-1 dark:invert"></i>
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
              coverState={coverState}
              setCoverState={setCoverState}
              setError={setError}
            />
            <AddToPost
              setShowPrev={setShowPrev}
              showPrev={showPrev}
              coverState={coverState}
              imagesList={imagesList}
              tagedFriends={tagedFriends}
              isFeeling={isFeeling}
              checkedOutAt={checkedOutAt}
            />
            <button
              className="cursor-pointer w-full py-2 text-sm font-semibold flex justify-center items-center mt-4 rounded-lg text-white bg-[var(--blue-color)] disabled:text-gray-300 disabled:bg-gray-200 dark:disabled:bg-[#4F5051] dark:disabled:text-gray-500 disabled:cursor-default"
              disabled={!(inputText.length > 0)}
              onClick={handleSubmitPost}
            >
              {loading && (
                <BeatLoader
                  color="white"
                  loading={loading}
                  size={4}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              )}
              {!loading && "Post"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainForm;
