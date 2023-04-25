import React, { useEffect, useRef, useState } from "react";
import { User } from "@/types/User.type";
import { Comment } from "@/types/Comment.type";
import EmojiPicker from "@/components/EmojiPicker";
import ToolTip from "@components/ToolTip";
import uploadImages from "@/helpers/upload";
import { ClipLoader } from "react-spinners";
import { Post } from "@/types/Post.type";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  MutationDefinition,
} from "@reduxjs/toolkit/dist/query";

type Props = {
  autoFocus?: boolean;
  currentUser: User;
  post: Post;
  addComment?: any;
  commentIsBeingAdded?: boolean;
  updateComment?: any;
  commentIsBeingUpdated?: boolean;
  replyTo?: string;
  commentContent?: Comment;
  setEditCommentId?: React.Dispatch<React.SetStateAction<string>>;
  setLocalPost?: React.Dispatch<React.SetStateAction<Post>>;
  setLocalComment?: React.Dispatch<React.SetStateAction<Comment>>;
};

const PostCreateComment: React.FC<Props> = ({
  autoFocus = false,
  currentUser,
  post,
  addComment,
  commentIsBeingAdded,
  updateComment,
  commentIsBeingUpdated,
  replyTo,
  commentContent,
  setEditCommentId,
  setLocalPost,
  setLocalComment,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputText, setInputText] = useState<string>(
    commentContent ? commentContent.text : ""
  );
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [imageUrl, setImageUrl] = useState<string>(
    commentContent ? commentContent.image || "" : ""
  );
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
  const handleAddComment = async () => {
    // If there is add Comment Function
    if (addComment) {
      // With image
      if (imageUrl) {
        let cloudinaryURLs = [imageUrl];
        if (!cloudinaryURLs[0].startsWith("https")) {
          // Upload images
          cloudinaryURLs = await uploadImages(
            [imageUrl],
            `${currentUser.email}/comments/${post._id}`,
            currentUser.token
          );
        }
        if (typeof cloudinaryURLs === "string") {
          console.log(cloudinaryURLs);
          setError(cloudinaryURLs);
          return;
        }
        // Add comment here
        const newPost = await addComment({
          userId: currentUser.id,
          text: inputText,
          image: cloudinaryURLs[0],
          postId: post._id,
          parentId: replyTo,
        }).unwrap();
        setLocalPost &&
          setLocalPost({ ...post, commentsCount: newPost.commentsCount });
      }
      // Without image
      if (!imageUrl) {
        const newPost = await addComment({
          userId: currentUser.id,
          text: inputText,
          image: "",
          postId: post._id,
          parentId: replyTo,
        }).unwrap();
        setLocalPost &&
          setLocalPost({ ...post, commentsCount: newPost.commentsCount });
      }
    }
  };
  const handleUpdateComment = async () => {
    if (updateComment) {
      // With image
      if (imageUrl) {
        let cloudinaryURLs = [imageUrl];
        if (!cloudinaryURLs[0].startsWith("https")) {
          // Upload images
          cloudinaryURLs = await uploadImages(
            [imageUrl],
            `${currentUser.email}/comments/${post._id}`,
            currentUser.token
          );
        }
        if (typeof cloudinaryURLs === "string") {
          console.log(cloudinaryURLs);
          setError(cloudinaryURLs);
          return;
        }
        // Update comment here
        if (commentContent) {
          const { newPost, newComment } = await updateComment({
            commentId: commentContent?._id,
            userId: currentUser.id,
            postId: post._id,
            text: inputText,
            image: cloudinaryURLs[0],
            parentId: replyTo,
          }).unwrap();
          setLocalPost &&
            setLocalPost({ ...post, commentsCount: newPost.commentsCount });
          setLocalComment && setLocalComment(newComment);
        }
      }
      // Without image
      if (!imageUrl) {
        if (commentContent) {
          const { newPost, newComment } = await updateComment({
            commentId: commentContent?._id,
            userId: currentUser.id,
            text: inputText,
            image: "",
            postId: post._id,
            parentId: replyTo,
          }).unwrap();
          setLocalPost &&
            setLocalPost({ ...post, commentsCount: newPost.commentsCount });
          setLocalComment && setLocalComment(newComment);
        }
      }
      // Reset state edit comment
      setEditCommentId && setEditCommentId("");
    }
  };
  const handleKeyDownInput = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    try {
      // alert(e.key);
      if (e.key === "Escape") {
        setEditCommentId && setEditCommentId("");
      }
      if (e.key === "Enter" && (!!inputText || !!imageUrl)) {
        // Add comment
        if (!commentContent) {
          await handleAddComment();
        }
        // Update root comment
        if (commentContent) {
          await handleUpdateComment();
        }
        // Reset states
        setInputText("");
        setShowEmojiPicker(false);
        setImageUrl("");
        setEditCommentId && setEditCommentId("");
      }
    } catch (err: any) {
      console.log(err);
    }
  };
  return (
    <div className="w-full flex gap-2 max-w-[94%]">
      <button className="relative w-8 h-8 rounded-full border border-solid border-gray-400 outline-none hover--overlay overflow-hidden flex-shrink-0">
        <img
          src={currentUser.picture}
          alt=""
          className="w-full full - object-cover"
        />
      </button>
      <div className="flex-1 flex-shrink-0 flex flex-col gap-2">
        <div className="relative basis-[32px] flex items-center h-[32px] px-3 rounded-full bg-gray-100 dark:bg-[#3A3B3C]">
          {(commentIsBeingAdded || commentIsBeingUpdated) && (
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
            autoFocus={autoFocus}
            ref={inputRef}
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
            }}
            onKeyDown={handleKeyDownInput}
            type="text"
            className="flex-1 placeholder:text-gray-400 text-gray-800 caret-gray-800 border-none outline-none bg-transparent max-w-[111px] sm:max-w-none text-[12px] sm:text-[15px] dark:text-[#E4E6EB] dark:caret-[#E4E6EB]"
            disabled={commentIsBeingAdded}
            placeholder={`${commentIsBeingAdded ? "" : "Write a comment..."}`}
          />
          <div className="flex-shrink-0 flex relative ml-auto">
            <div
              id={`comment-emoji-${post._id}`}
              className="absolute left-0 top-0 -translate-x-full -translate-y-1/2 z-10"
            >
              {showEmojiPicker && (
                <EmojiPicker
                  onEmojiSelect={handleEmojiSelect}
                  setShowEmojiPicker={setShowEmojiPicker}
                  containerId={`comment-emoji-${post._id}`}
                  theme={document.body.className}
                />
              )}
            </div>
            <ToolTip
              title={emojiMoreInfoText}
              placement="bottom"
              offset={[0, 2]}
            >
              <div
                className="w-7 h-7 cursor-pointer rounded-full bg-transparent relative hover--overlay overflow-hidden flex justify-center items-center outline-none"
                onClick={() => {
                  setShowEmojiPicker(!showEmojiPicker);
                }}
              >
                <i className="emoji_icon scale-[85%] dark:invert"></i>
              </div>
            </ToolTip>
            <ToolTip
              title={imageMoreInfoText}
              placement="bottom"
              offset={[0, 2]}
            >
              <label
                htmlFor={`image-picker-${
                  commentContent ? commentContent._id : post._id
                }`}
                className="cursor-pointer w-7 h-7 rounded-full bg-transparent relative hover--overlay overflow-hidden flex justify-center items-center outline-none"
              >
                <input
                  type="file"
                  hidden
                  accept="image/jpeg, image/png, image/gif, image/webp"
                  name={`image-picker-${
                    commentContent ? commentContent._id : post._id
                  }`}
                  id={`image-picker-${
                    commentContent ? commentContent._id : post._id
                  }`}
                  onChange={handleSelectImage}
                />
                <i className="camera_icon scale-[85%] dark:invert"></i>
              </label>
            </ToolTip>
            <ToolTip title={gifMoreInfoText} placement="bottom" offset={[0, 2]}>
              <button className="w-7 h-7 rounded-full bg-transparent relative hover--overlay overflow-hidden flex justify-center items-center outline-none">
                <i className="gif_icon scale-[85%] dark:invert"></i>
              </button>
            </ToolTip>
            <ToolTip
              title={stickerMoreInfoText}
              placement="bottom"
              offset={[0, 2]}
            >
              <button className="w-7 h-7 rounded-full bg-transparent relative hover--overlay overflow-hidden flex justify-center items-center outline-none">
                <i className="sticker_icon scale-[85%] dark:invert"></i>
              </button>
            </ToolTip>
          </div>
        </div>
        {commentContent && (
          <p className="text-[13px] text-gray-600 -mt-[3px] mb-1 ml-1">
            Press esc to{" "}
            <button
              className="text-blue-600"
              onClick={() => {
                setEditCommentId && setEditCommentId("");
              }}
            >
              cancel
            </button>
          </p>
        )}
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
        {commentIsBeingUpdated && (
          <span className="italic text-sm text-gray-600 px-2">Updating...</span>
        )}
      </div>
    </div>
  );
};

export default PostCreateComment;
