import React, { useState } from "react";
import Style from "./style.module.css";

type Props = {
  setShowPrev: React.Dispatch<React.SetStateAction<boolean>>;
  imagesList: any[];
  setImagesList: React.Dispatch<React.SetStateAction<any[]>>;
};
const generateError = (filesName: string[]) => {
  if (filesName.length === 1) {
    return `Your file can't be uploaded: ${filesName[0]}`;
  }
  if (filesName.length > 1) {
    return `Your files can't be uploaded: ${filesName.join(", ")}`;
  }
  return "";
};
const ImagePicker: React.FC<Props> = ({
  setShowPrev,
  imagesList,
  setImagesList,
}) => {
  const num = 5;
  const [error, setError] = useState("");
  const handleUploadImages = (events: React.ChangeEvent<HTMLInputElement>) => {
    let files = Array.from(events.target.files!);
    if (files) {
      let invalidImages: string[] = [];
      files.forEach((image) => {
        // Handle file is not image
        if (
          image.type !== "image/png" &&
          image.type !== "image/jpeg" &&
          image.type !== "image/webp" &&
          image.type !== "image/gif"
        ) {
          invalidImages.push(image.name);
        }
        // Handle file is bigger than 1Mb
        if (image.size > 1024 * 1024) {
          invalidImages.push(image.name);
        }
      });
      if (invalidImages.length > 0) {
        files = files.filter((image) => {
          return !invalidImages.includes(image.name);
        });
        const error = generateError(invalidImages);
        setError(error);
      }
      //   Add images to imagesList state
      files.forEach((image) => {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.addEventListener("load", (e) => {
          const src = e.target!.result;
          setImagesList((prevList) => {
            return [...prevList, src];
          });
        });
      });
    }
  };
  return (
    <div className="relative rounded-lg border border-solid border-gray-300 p-2 group">
      <div
        className="cursor-pointer absolute top-4 right-4 w-[28.8px] h-[28.8px] bg-white border border-solid border-gray-400 hover:bg-gray-100 rounded-full flex justify-center items-center z-20"
        onClick={() => {
          setImagesList([]);
          setShowPrev(false);
        }}
      >
        <i className="exit_icon"></i>
      </div>
      {/* If there is/are image(s) */}
      {!!imagesList && !!imagesList.length && (
        <div className="relative rounded-lg overflow-hidden mb-2">
          <div className="absolute inset-0 bg-gray-800 opacity-20 z-10 hidden group-hover:block"></div>
          <div className="absolute top-3 left-3 z-20 gap-2 hidden group-hover:flex">
            {/* <button className="py-2 px-3 rounded-lg bg-gray-50 hover:bg-gray-100 flex gap-2 items-center text-black ">
              <i className="edit_icon"></i>
              <span>Edit all</span>
            </button> */}
            <label
              htmlFor="pc-img-picker"
              className="cursor-pointer py-2 px-3 rounded-lg bg-gray-50 hover:bg-gray-100 active:bg-gray-200 flex gap-2 items-center text-black"
            >
              <input
                type="file"
                id="pc-img-picker"
                name="pc-img-picker"
                multiple
                className="hidden"
                accept="image/jpeg, image/png, image/gif, image/webp"
                onChange={handleUploadImages}
              />
              <i className="addPhoto_icon"></i>
              <span className="font-medium">Add Photos/Videos</span>
            </label>
          </div>
          <div
            className={`${
              Style[`template-${imagesList.length > 5 ? 5 : imagesList.length}`]
            }`}
          >
            {imagesList.slice(0, 4).map((imageSrc, index) => {
              return <img key={index} src={imageSrc} alt="" />;
            })}
            <div className="relative">
              {imagesList.length - 5 > 0 && (
                <>
                  <div className="absolute inset-0 bg-gray-800 opacity-20 z-10"></div>
                  <div className="absolute inset-0 flex justify-center items-center text-3xl text-white font-medium z-20">
                    +{imagesList.length - 5}
                  </div>
                </>
              )}
              <img
                src={imagesList[4]}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}
      {/* No image */}
      {(!imagesList || imagesList.length === 0) && (
        <label
          htmlFor="pc-img-picker"
          className="rounded-lg mb-2 bg-gray-50 flex flex-col gap-1 justify-center items-center hover:bg-gray-100 active:bg-gray-300 h-[190px] cursor-pointer"
        >
          <input
            type="file"
            id="pc-img-picker"
            name="pc-img-picker"
            multiple
            className="hidden"
            accept="image/jpeg, image/png, image/gif, image/webp"
            onChange={handleUploadImages}
          />
          <div className="w-10 h-10 rounded-full bg-gray-200 flex justify-center items-center">
            <i className="addPhoto_icon"></i>
          </div>
          <p className="text-lg font-semibold leading-4">Add photos/Videos</p>
          <p className="text-sm text-gray-500">or drag and drop</p>
        </label>
      )}

      <div className="rounded-lg bg-gray-50 flex gap-3 justify-start items-center h-[72px] p-3">
        {/* Mobile */}
        {/* <input
          type="file"
          id="mobile-img-picker"
          name="mobile-img-picker"
          multiple
          className="hidden"
        /> */}
        <div className="w-10 h-10 rounded-full bg-gray-200 flex justify-center items-center">
          <i className="phone_icon"></i>
        </div>
        <p className="text-sm text-gray-500">
          Add photos and videos from your mobile device
        </p>
        <button className="py-2 px-3 bg-gray-200 rounded-lg font-medium ml-auto">
          Add
        </button>
      </div>
    </div>
  );
};

export default ImagePicker;
