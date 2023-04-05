import React, { useEffect, useRef, useState } from "react";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  MutationDefinition,
} from "@reduxjs/toolkit/dist/query";
import { Post } from "@/types/Post.type";
import { User } from "@/types/User.type";
import EmojiPicker from "@/components/EmojiPicker";
import ToolTip from "@components/ToolTip";
import { useAddCommentMutation } from "@/store/api/commentsApi";
import { useUpdateCommentMutation } from "@/store/api/commentsApi";
import { useDeleteCommentMutation } from "@/store/api/commentsApi";
import uploadImages from "@/helpers/upload";
import { ClipLoader } from "react-spinners";

type Props = {
  currentUser: User;
  post: Post;
  addComment: any;
  commentIsBeingAdded: boolean;
};

const PostCreateComment: React.FC<Props> = ({
  currentUser,
  post,
  addComment,
  commentIsBeingAdded,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputText, setInputText] = useState<string>("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageIsLoading, setImageIsLoading] = useState<boolean>(false);
  const [emojiMoreInfoText, setEmojiMoreInfoText] =
    useState<string>("Insert an emoji");
  const [imageMoreInfoText, setImageMoreInfoText] =
    useState<string>("Attach a photo");
  const [gifMoreInfoText, setgifMoreInfoText] =
    useState<string>("Comment with a gif");
  const [stickerMoreInfoText, setStickerMoreInfoText] = useState<string>(
    "Comment with a sticker"
  );
  const [error, setError] = useState<string>("");
  useEffect(() => {
    inputRef.current!.selectionEnd = cursorPosition;
  }, [cursorPosition]);
  const handleEmojiSelect = (emoji: any) => {
    const ref = inputRef.current;
    if (ref) {
      const start = inputText.substring(0, ref.selectionStart || 0);
      const end = inputText.substring(ref.selectionEnd || 0);
      const newText = start + emoji.native + end;
      setInputText(newText);
      setCursorPosition(start.length + emoji.native.length);
    }
  };
  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageIsLoading(true);
      const file = e.target.files[0];
      // Handle if is image
      if (
        file.type !== "image/png" &&
        file.type !== "image/jpeg" &&
        file.type !== "image/webp" &&
        file.type !== "image/gif"
      ) {
        setImageMoreInfoText(
          `Image with type ${file.type} is not allow, please try again.`
        );
        setImageIsLoading(false);
        return;
      }
      // Handle if is too big
      if (file.size > 1024 * 1024) {
        setImageMoreInfoText(`The image is attached can't be bigger than 1Mb`);
        setImageIsLoading(false);
        return;
      }

      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        const url = fileReader.result!.toString();
        setImageUrl(url);
      };
      fileReader.onerror = () => {
        setImageMoreInfoText(fileReader.error?.message || "");
      };
      setImageIsLoading(false);
    }
  };
  const handleKeyDownInput = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    try {
      if (e.key === "Enter" && (!!inputText || !!imageUrl)) {
        // With image
        if (imageUrl) {
          // Upload images
          const cloudinaryURLs = await uploadImages(
            [imageUrl],
            `${currentUser.email}/comments/${post._id}`,
            currentUser.token
          );
          if (typeof cloudinaryURLs === "string") {
            console.log(cloudinaryURLs);
            setError(cloudinaryURLs);
            return;
          }
          // Add comment here
          await addComment({
            userId: currentUser.id,
            text: inputText,
            image: cloudinaryURLs[0],
            postId: post._id,
          }).unwrap();
          // Update comments counts of post
        }
        // Without image
        if (!imageUrl) {
          await addComment({
            userId: currentUser.id,
            text: inputText,
            image: "",
            postId: post._id,
          }).unwrap();
          // Update comments counts of post
        }
      }
    } catch (err: any) {
      console.log(err);
    }
  };
  return (
    <div className="w-full mx-4 flex gap-2 max-w-[94%] my-2">
      <button className="relative w-8 h-8 rounded-full border border-solid border-gray-400 outline-none hover--overlay overflow-hidden">
        <img
          src={currentUser.picture}
          alt=""
          className="w-full full - object-cover"
        />
      </button>
      <div className="flex-1 flex-shrink-0 flex flex-col gap-2">
        <div className="relative basis-[32px] flex items-center h-[32px] px-3 rounded-full bg-gray-100">
          {commentIsBeingAdded && (
            <ClipLoader
              color={"gray"}
              loading={commentIsBeingAdded}
              size={14}
              aria-label="Loading Spinner"
              data-testid="loader"
              className="absolute top-2 left-2 border-2"
            />
          )}
          <input
            ref={inputRef}
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
            }}
            onKeyDown={handleKeyDownInput}
            type="text"
            className="flex-1 text-[15px] placeholder:text-gray-400 text-gray-800 caret-gray-800 border-none outline-none bg-transparent"
            disabled={commentIsBeingAdded}
            placeholder={`${commentIsBeingAdded ? "" : "Write a comment..."}`}
          />
          <div className="flex-shrink-0 flex relative">
            <div
              id="comment-emoji"
              className="absolute left-0 top-0 -translate-x-full z-10"
            >
              {showEmojiPicker && (
                <EmojiPicker
                  onEmojiSelect={handleEmojiSelect}
                  setShowEmojiPicker={setShowEmojiPicker}
                  containerId="comment-emoji"
                />
              )}
            </div>
            <ToolTip
              title={emojiMoreInfoText}
              placement="bottom"
              offset={[0, 2]}
            >
              <button
                className="w-7 h-7 rounded-full bg-transparent hover:bg-gray-200 flex justify-center items-center outline-none"
                onClick={() => {
                  setShowEmojiPicker(!showEmojiPicker);
                }}
              >
                <i className="emoji_icon scale-[85%]"></i>
              </button>
            </ToolTip>
            <ToolTip
              title={imageMoreInfoText}
              placement="bottom"
              offset={[0, 2]}
            >
              <label
                htmlFor="image-picker"
                className="cursor-pointer w-7 h-7 rounded-full bg-transparent hover:bg-gray-200 flex justify-center items-center outline-none"
              >
                <input
                  type="file"
                  hidden
                  accept="image/jpeg, image/png, image/gif, image/webp"
                  name="image-picker"
                  id="image-picker"
                  onChange={handleSelectImage}
                />
                <i className="camera_icon scale-[85%]"></i>
              </label>
            </ToolTip>
            <ToolTip title={gifMoreInfoText} placement="bottom" offset={[0, 2]}>
              <button className="w-7 h-7 rounded-full bg-transparent hover:bg-gray-200 flex justify-center items-center outline-none">
                <i className="gif_icon scale-[85%]"></i>
              </button>
            </ToolTip>
            <ToolTip
              title={stickerMoreInfoText}
              placement="bottom"
              offset={[0, 2]}
            >
              <button className="w-7 h-7 rounded-full bg-transparent hover:bg-gray-200 flex justify-center items-center outline-none">
                <i className="sticker_icon scale-[85%]"></i>
              </button>
            </ToolTip>
          </div>
        </div>
        {(imageUrl || imageIsLoading) && (
          <div className="relative max-h-[200px] min-h-[20px]">
            <button
              className="absolute right-0 top-0 w-5 h-5 rounded-full bg-gray-200 hover:bg-gray-300"
              onClick={() => {
                setImageUrl("");
              }}
            >
              <i className="exit_icon scale-50"></i>
            </button>
            {imageIsLoading && !imageUrl && (
              <div className="absolute top-2 left-0 w-[95%] h-1 bg-[var(--blue-color)] rounded-full"></div>
            )}
            {imageUrl && (
              <img
                src={imageUrl}
                alt=""
                className="h-full w-auto object-cover"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCreateComment;
