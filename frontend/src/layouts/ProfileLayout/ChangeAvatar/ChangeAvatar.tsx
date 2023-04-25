import React, { useCallback, useRef, useState } from "react";
import Style from "./style.module.css";
import ReactDOM from "react-dom";
import EditAvatar from "./EditAvatar";
import { useGetImagesQuery } from "@/store/api/usersApi";
import { ClipLoader } from "react-spinners";

type Props = {
  userInfo: any;
  setShowPopUp: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChangeAvatar: React.FC<Props> = ({ userInfo, setShowPopUp }) => {
  const folder = `${userInfo.email}/profile_pictures`;
  const { data, isLoading, isFetching } = useGetImagesQuery(
    {
      folder,
      sort: "desc",
      max: 12,
    },
    { refetchOnMountOrArgChange: true }
  );

  const [error, setError] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const refInput = useRef<HTMLInputElement>(null);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      let file = e.target.files[0];
      if (
        file.type !== "image/jpeg" &&
        file.type !== "image/png" &&
        file.type !== "image/webp" &&
        file.type !== "image/gif"
      ) {
        setError(`${file.name} format is not supported.`);
        return;
      } else if (file.size > 1024 * 1024) {
        setError(`${file.name} is too large (1Mb is maximum)`);
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        // console.log(event.target?.result as string);
        setImageUrl(event.target?.result as string);
      };
    }
    // Clear file
    e.target.value = "";
  };
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex justify-center items-center z-20">
      {imageUrl && (
        <EditAvatar
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          setShowPopUp={setShowPopUp}
          userInfo={userInfo}
        />
      )}
      <input
        type="file"
        accept="image/jpeg, image/png, image/gif, image/webp"
        ref={refInput}
        hidden
        onChange={handleImage}
      />
      {/* Background */}
      <div className="absolute inset-0 bg-white dark:bg-[#242526] opacity-80"></div>
      {/* Form */}
      <div className="relative flex-1 max-w-[700px] rounded-lg shadow2 bg-white dark:bg-[#242526] overflow-hidden border border-solid border-gray-200 dark:border-[#3E4042] mx-4">
        {/* Error */}
        {!!error && (
          <div className="absolute z-10 inset-0 bg-white dark:bg-[#3E4042] dark:bg-opacity-95 bg-opacity-95 flex justify-center items-center gap-4">
            <p className="font-medium text-red-600">{error}</p>
            <button
              className=" py-1 px-3 bg-blue-600 text-white rounded-md active:scale-95 active:bg-blue-700"
              onClick={() => {
                setImageUrl("");
                setError("");
              }}
            >
              Try again
            </button>
          </div>
        )}
        {/* Header */}
        <div className="w-full relative flex justify-center items-center border-b border-solid border-gray-300 dark:border-[#3E4042]">
          <h1 className="py-5 text-xl font-bold dark:text-[#b0b3b8]">
            Update profile picture
          </h1>
          <button
            className="absolute top-1/2 -translate-y-1/2 right-4 flex justify-center items-center rounded-full bg-gray-200 dark:bg-[#4E4F50] p-2"
            onClick={() => {
              setShowPopUp(false);
            }}
          >
            <i className="exit_icon scale-80 dark:invert"></i>
          </button>
        </div>
        {/* Content */}
        <div className="w-full p-3 relative overflow-y-auto">
          {/* Buttons */}
          <div className="flex flex-col items-stretch gap-2">
            <button
              className="relative hover--overlay flex justify-center items-center gap-2 bg-blue-50 dark:bg-[#3C4D63] text-blue-500 dark:text-[#418DF1] font-semibold py-2 outline-none rounded-md"
              onClick={() => {
                refInput.current && refInput.current.click();
              }}
            >
              <span className="text-2xl font-normal -mt-1">+</span>
              <span>Upload photo</span>
            </button>
            <button className="relative hover--overlay flex justify-center items-center gap-2 bg-gray-100 dark:bg-[#3A3B3C] text-gray-900 font-semibold py-2 outline-none rounded-md">
              <i className="frame_icon dark:invert"></i>
              <span className="dark:text-[#b0b3b8]">Add Frame</span>
            </button>
          </div>
          {/* Uploads */}
          <h1 className="mt-5 mb-3 text-[17px] font-medium dark:text-[#E4E6EB]">
            Uploads
          </h1>
          {isLoading && (
            <div className="w-full flex justify-center items-center p-3">
              {/* Loading */}
              <ClipLoader
                color={"gray"}
                loading={isLoading}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          )}
          {!isLoading && (!data || data.imagesUrl.length === 0) && (
            <div className="w-full flex justify-center items-center pb-10 text-lg text-[#b0b3b8]">
              No profile picture is uploaded
            </div>
          )}
          {!isLoading && data && (
            <div className="grid grid-cols-6 gap-2 ">
              {data.imagesUrl.map((image) => {
                return (
                  <button
                    key={image}
                    className="relative w-full aspect-square border border-solid border-gray-200 dark:border-[#3E4042] hover--overlay rounded-md overflow-hidden"
                    onClick={() => {
                      setImageUrl(image);
                    }}
                  >
                    <img src={image} className="w-full h-full object-cover" />
                  </button>
                );
              })}
            </div>
          )}
        </div>{" "}
      </div>
    </div>,
    document.getElementById("portal")!
  );
};

export default ChangeAvatar;
