import { Post } from "@/types/Post.type";
import React, { useEffect, useRef, useState } from "react";
import Style from "./style.module.css";
import covers from "@data/covers";
import { getAverageColorFromImageUrl } from "@/helpers/getAverageRGB";

type Props = {
  post: Post;
};

const PostContent: React.FC<Props> = ({ post }) => {
  const cover = covers.find((c) => {
    return c.id === post.coverId;
  });
  const [averageCoverColor, setAverageCoverColor] = useState<string>("");
  useEffect(() => {
    (async () => {
      try {
        if (post.type === "profileCover" && post.imagesList) {
          const rgb = await getAverageColorFromImageUrl(post.imagesList[0]);
          setAverageCoverColor(rgb);
        }
      } catch (err: any) {
        alert(err.message);
      }
    })();
  }, []);
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
                    <div className="absolute inset-0 bg-gray-800 opacity-20 z-[8]"></div>
                    <div className="absolute inset-0 flex justify-center items-center text-3xl text-white font-medium z-[9]">
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
      {post.type === "profilePicture" && post.imagesList && (
        <div className="relative flex justify-center items-center py-8">
          {!post.user.cover && (
            <div className="absolute top-0 left-0 right-0 h-[50%] bg-gray-200 z-[0]"></div>
          )}
          {post.user.cover && (
            <img
              src={post.user.cover}
              alt=""
              className="absolute top-0 w-full h-[50%] object-cover"
            />
          )}
          <img
            src={post.imagesList[0]}
            alt=""
            className="w-[200px] h-[200px] sm:w-[388px] sm:h-[388px] rounded-full border-[4px] border-solid border-white z-[1]"
          />
        </div>
      )}
      {post.type === "profileCover" && post.imagesList && (
        <div
          className="flex justify-center"
          style={{
            background: averageCoverColor,
          }}
        >
          <img src={post.imagesList[0]} alt="" className="w-[80%]" />
        </div>
      )}
    </>
  );
};

export default PostContent;
