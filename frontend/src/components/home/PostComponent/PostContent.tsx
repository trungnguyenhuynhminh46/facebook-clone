import { Post } from "@/types/Post.type";
import React from "react";
import Style from "./style.module.css";
import covers from "@data/covers";

type Props = {
  post: Post;
};

const PostContent: React.FC<Props> = ({ post }) => {
  const cover = covers.find((c) => {
    return c.id === post.coverId;
  });
  return (
    <>
      {post.type === "onlyText" && (
        <div className="w-full text-2xl px-4 mb-2">{post.text}</div>
      )}
      {post.type === "withImages" && post.imagesList && (
        <div>
          <p className="text-[15px] leading-4 px-4 mb-3">{post.text}</p>
          <div
            className={`${
              Style[
                `template-${
                  post.imagesList.length > 5 ? 5 : post.imagesList.length
                }`
              ]
            }`}
          >
            {post.imagesList.slice(0, 4).map((imageSrc, index) => {
              return <img key={index} src={imageSrc} alt="" />;
            })}
            {post.imagesList.length - 5 >= 0 && (
              <div className="relative">
                {post.imagesList.length - 5 > 0 && (
                  <>
                    <div className="absolute inset-0 bg-gray-800 opacity-20 z-10"></div>
                    <div className="absolute inset-0 flex justify-center items-center text-3xl text-white font-medium z-20">
                      +{post.imagesList.length - 5}
                    </div>
                  </>
                )}
                <img
                  src={post.imagesList[4]}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      )}
      {post.type === "cover" && (
        <div className="relative w-full flex justify-center items-center">
          <img
            src={`/images/postBackgrounds/${cover?.image}`}
            alt=""
            className="w-full h-auto"
          />
          <p
            className="max-w-[400px] text-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[30px] font-semibold"
            style={{
              caretColor: cover?.caretColor,
              color: cover?.color,
            }}
          >
            {post.text}
          </p>
        </div>
      )}
    </>
  );
};

export default PostContent;
