import { isoStringToDate } from "@/helpers/date";
import { Post } from "@/types/Post.type";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Dots } from "@/svg";
import Tippy from "@tippyjs/react/headless";
import { User } from "@/types/User.type";
import DeleteConfirmForm from "../DeleteConfirmForm/DeleteConfirmForm";

type Props = {
  post: Post;
  currentUser: User;
};

type PropsMenuItem = {
  icon?: string;
  img?: string;
  title?: string;
  subTitle?: string;
  onClick?: () => void;
  setShowToolTip: React.Dispatch<React.SetStateAction<boolean>>;
};

const MenuItem: React.FC<PropsMenuItem> = ({
  icon,
  img,
  title,
  subTitle,
  onClick,
  setShowToolTip,
}) => {
  return (
    <button
      className="flex gap-3 items-center justify-start p-2 rounded-md hover:bg-gray-200"
      onClick={() => {
        setShowToolTip(false);
        onClick && onClick();
      }}
    >
      {icon && <i className={icon}></i>}
      {img && <img src={img} alt="" />}
      <div className="flex flex-col">
        {title && <p className="text-start font-medium leading-5">{title}</p>}
        {subTitle && (
          <p className="text-start text-sm text-[var(--color-secondary)]">
            {subTitle}
          </p>
        )}
      </div>
    </button>
  );
};

const PostHeader: React.FC<Props> = ({ post, currentUser }) => {
  const isOwner = post.user._id === currentUser.id;
  const imagesLength = post.imagesList?.length || 0;
  const [showToolTip, setShowToolTip] = useState(false);
  const [showDeleteConfirmForm, setShowDeleteConfirmForm] =
    useState<boolean>(false);
  return (
    <div className="flex items-center py-3 px-4 gap-2">
      <Link to={`/profile/${post.user.email}`}>
        <div className="relative hover--overlay h-10 w-10 rounded-full border border-solid border-gray-300 overflow-hidden">
          <img
            src={post.user.picture}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </Link>
      <div className="flex flex-col">
        <div>
          <span className="text-[15px] font-semibold">
            {post.user.username}
          </span>
          {post.type === "profilePicture" && (
            <span className="text-gray-500 font-light">
              {" "}
              updated his profile picture
            </span>
          )}
          {post.type === "profileCover" && (
            <span className="text-gray-500 font-light">
              {" "}
              updated his cover photo
            </span>
          )}
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-[13px] text-[var(--color-secondary)] tracking-wide">
            {isoStringToDate(post.createdAt, "MMMM d 'at' h:mm a")}
          </span>
          {post.isSharedTo === "public" && (
            <img src="/icons/public.png" alt="" className="w-3 h-3" />
          )}
          {post.isSharedTo === "friends" && (
            <img src="/icons/friends_post.png" alt="" className="w-3 h-3" />
          )}
          {post.isSharedTo === "onlyMe" && (
            <img src="/icons/private.png" alt="" className="w-3 h-3" />
          )}
        </div>
      </div>
      <Tippy
        popperOptions={{ modifiers: [{ name: "flip", enabled: false }] }}
        onClickOutside={() => {
          setShowToolTip(false);
        }}
        visible={showToolTip}
        placement="bottom-end"
        offset={[0, 10]}
        delay={300}
        interactive={true}
        render={(attrs) => (
          <div
            className="w-[300px] min-h-10 bg-white rounded-lg shadow3 p-2 flex flex-col"
            tabIndex={-1}
            {...attrs}
          >
            {isOwner && (
              <MenuItem
                setShowToolTip={setShowToolTip}
                icon="pin_icon"
                title="Pin Post"
              />
            )}
            <MenuItem
              setShowToolTip={setShowToolTip}
              icon="save_icon"
              title="Save Post"
              subTitle="Add this to your saved items."
            />
            <div className="spacer my-3"></div>
            {isOwner && (
              <MenuItem
                setShowToolTip={setShowToolTip}
                icon="edit_icon"
                title="Edit Post"
              />
            )}
            {imagesLength > 0 && (
              <MenuItem
                setShowToolTip={setShowToolTip}
                icon="download_icon"
                title="Download"
              />
            )}
            {imagesLength > 0 && (
              <MenuItem
                setShowToolTip={setShowToolTip}
                icon="fullscreen_icon"
                title="Enter Fullscreen"
              />
            )}
            {isOwner && (
              <MenuItem
                setShowToolTip={setShowToolTip}
                img="/icons/lock.png"
                title="Edit audience"
              />
            )}
            {!isOwner && (
              <MenuItem
                setShowToolTip={setShowToolTip}
                icon="turnOnNotification_icon"
                title="Turn on notifications for this post"
              />
            )}
            {isOwner && (
              <MenuItem
                setShowToolTip={setShowToolTip}
                icon="delete_icon"
                title="Turn off translations"
              />
            )}
            {isOwner && (
              <MenuItem
                setShowToolTip={setShowToolTip}
                icon="date_icon"
                title="Edit Date"
              />
            )}
            {isOwner && (
              <MenuItem
                setShowToolTip={setShowToolTip}
                icon="refresh_icon"
                title="Refresh share attachment"
              />
            )}
            {isOwner && (
              <MenuItem
                setShowToolTip={setShowToolTip}
                icon="archive_icon"
                title="Move to archive"
              />
            )}
            {isOwner && (
              <>
                {post._id && showDeleteConfirmForm && (
                  <DeleteConfirmForm
                    postId={post._id}
                    setIsShown={setShowDeleteConfirmForm}
                  />
                )}
                <MenuItem
                  setShowToolTip={setShowToolTip}
                  icon="trash_icon"
                  title="Move to trash"
                  subTitle="Items in your trash are deleted after 30 days"
                  onClick={() => setShowDeleteConfirmForm(true)}
                />
              </>
            )}
            {!isOwner && <div className="spacer"></div>}
            {!isOwner && (
              <MenuItem
                setShowToolTip={setShowToolTip}
                img="/icons/report.png"
                title="Report post"
                subTitle="I'm concerned about this post"
              />
            )}
          </div>
        )}
      >
        <button
          className="ml-auto h-9 w-9 rounded-full overflow-hidden hover:bg-gray-100 flex justify-center items-center outline-none"
          onClick={() => {
            setShowToolTip(!showToolTip);
          }}
        >
          <Dots />
        </button>
      </Tippy>
    </div>
  );
};

export default PostHeader;
