import isoStringToDate from "@/helpers/isoStringToDate";
import { Post } from "@/types/Post";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Dots } from "@/svg";
import Tippy from "@tippyjs/react/headless";
import { User } from "@/types/User";

type Props = {
  post: Post;
  currentUser: User;
};

type PropsMenuItem = {
  icon?: string;
  img?: string;
  title?: string;
  subTitle?: string;
};

const MenuItem: React.FC<PropsMenuItem> = ({ icon, img, title, subTitle }) => {
  return (
    <button className="flex gap-3 items-center justify-start p-2 rounded-md hover:bg-gray-200">
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
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <div className="flex items-center py-3 px-4 gap-2">
      <Link to={`/user`}>
        <div className="relative hover--overlay h-10 w-10 rounded-full border border-solid border-gray-300 overflow-hidden">
          <img
            src={post.user.picture}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </Link>
      <div className="flex flex-col">
        <span className="text-[15px] font-semibold">{post.user.username}</span>
        <div className="flex gap-2 items-center">
          <span className="text-[13px] text-[var(--color-secondary)] tracking-wide">
            {isoStringToDate(post.createdAt)}
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
          setShowTooltip(false);
        }}
        visible={showTooltip}
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
            {isOwner && <MenuItem icon="pin_icon" title="Pin Post" />}
            <MenuItem
              icon="save_icon"
              title="Save Post"
              subTitle="Add this to your saved items."
            />
            <div className="spacer my-3"></div>
            {isOwner && <MenuItem icon="edit_icon" title="Edit Post" />}
            {imagesLength > 0 && (
              <MenuItem icon="download_icon" title="Download" />
            )}
            {imagesLength > 0 && (
              <MenuItem icon="fullscreen_icon" title="Enter Fullscreen" />
            )}
            {isOwner && (
              <MenuItem img="/icons/lock.png" title="Edit audience" />
            )}
            {!isOwner && (
              <MenuItem
                icon="turnOnNotification_icon"
                title="Turn on notifications for this post"
              />
            )}
            {isOwner && (
              <MenuItem icon="delete_icon" title="Turn off translations" />
            )}
            {isOwner && <MenuItem icon="date_icon" title="Edit Date" />}
            {isOwner && (
              <MenuItem icon="refresh_icon" title="Refresh share attachment" />
            )}
            {isOwner && (
              <MenuItem icon="archive_icon" title="Move to archive" />
            )}
            {isOwner && (
              <MenuItem
                icon="trash_icon"
                title="Move to trash"
                subTitle="Items in your trash are deleted after 30 days"
              />
            )}
            {!isOwner && <div className="spacer"></div>}
            {!isOwner && (
              <MenuItem
                img="/icons/report.png"
                title="Report post"
                subTitle="I'm concerned about this post"
              />
            )}
          </div>
        )}
      >
        <button
          className="ml-auto mr-4 h-9 w-9 rounded-full overflow-hidden hover:bg-gray-100 flex justify-center items-center outline-none"
          onClick={() => {
            setShowTooltip(!showTooltip);
          }}
        >
          <Dots />
        </button>
      </Tippy>
    </div>
  );
};

export default PostHeader;
