import React, { useCallback, useEffect, useRef, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import "./style.css";
import getCroppedImg from "@/helpers/cropImage";
import Cookies from "js-cookie";
import {
  useGetImagesQuery,
  useUpdateProfileCoverByEmailMutation,
} from "@/store/api/usersApi";
import { useDispatch } from "react-redux";
import { updateCoverImage } from "@/store/slices/user";
import uploadImages from "@/helpers/upload";
import { useAddPostMutation } from "@/store/api/postsApi";
import { BeatLoader, ClipLoader } from "react-spinners";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import ReactDom from "react-dom";
import Skeleton from "react-loading-skeleton";

type Props = {
  isOwner: boolean;
  userInfo?: any;
  currentUser: any;
};

type SelectUploadedCoverProps = {
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  setShowSelectUploadedPhotos: React.Dispatch<React.SetStateAction<boolean>>;
  userInfo?: any;
};

const SelectUploadedCoverPopUp: React.FC<SelectUploadedCoverProps> = ({
  setImageUrl,
  setShowSelectUploadedPhotos,
  userInfo,
}) => {
  const folder = `${userInfo.email}/profile_cover`;
  const { data, isLoading, isFetching } = useGetImagesQuery({
    folder,
    sort: "desc",
    max: 12,
  });
  return ReactDom.createPortal(
    <div className="fixed inset-0 flex justify-center items-center z-20">
      {/* Background */}
      <div className="absolute inset-0 bg-white dark:bg-[#242526] opacity-80"></div>
      {/* Form */}
      <div className="relative flex-1 max-w-[548px] rounded-lg shadow2 bg-white dark:bg-[#242526] overflow-hidden border border-solid border-gray-200 dark:border-[#3E4042] mx-4">
        {/* Header */}
        <div className="w-full relative flex justify-center items-center border-b border-solid border-gray-300 dark:border-[#3E4042]">
          <h1 className="py-5 text-xl font-bold dark:text-[#E4E6EB]">
            Select photo
          </h1>
          <button
            className="absolute top-1/2 -translate-y-1/2 right-4 flex justify-center items-center rounded-full bg-gray-200 dark:bg-[#4E4F50] p-2"
            onClick={() => {
              setShowSelectUploadedPhotos(false);
            }}
          >
            <i className="exit_icon scale-80 dark:invert"></i>
          </button>
        </div>
        {/* Uploaded image */}
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
          <div className="w-full flex justify-center items-center pt-8 pb-5 text-lg text-[#b0b3b8] ">
            No cover picture is uploaded
          </div>
        )}
        {!isLoading && data && (
          <div className="w-full p-3 grid grid-cols-3 gap-1 sm:gap-2">
            {data.imagesUrl.map((image) => {
              return (
                <button
                  key={image}
                  className="relative w-full aspect-video border border-solid border-gray-200 dark:border-[#3E4042] hover--overlay rounded-md overflow-hidden"
                  onClick={() => {
                    setImageUrl(image);
                    setShowSelectUploadedPhotos(false);
                  }}
                >
                  <img src={image} className="w-full h-full object-cover" />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>,
    document.getElementById("portal")!
  );
};

const CoverImage: React.FC<Props> = ({ isOwner, userInfo, currentUser }) => {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [showEditCoverPhotoMenu, setShowEditCoverPhotoMenu] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [updateProfileCover] = useUpdateProfileCoverByEmailMutation();
  const [handleAddPost] = useAddPostMutation();
  const [showSelectUploadedPhotos, setShowSelectUploadedPhotos] =
    useState<boolean>(false);
  // Handlers
  useOnClickOutside(menuRef, () => {
    setShowEditCoverPhotoMenu(false);
  });
  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );
  const handlePickPicture = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  const handleUpdateProfileCover = useCallback(async () => {
    try {
      setIsLoading(true);
      // Handle crop picture
      if (croppedAreaPixels) {
        const croppedImage = await getCroppedImg(imageUrl, croppedAreaPixels);
        if (croppedImage) {
          setImageUrl(croppedImage);
          setCrop({ x: 0, y: 0 });
          setZoom(1);
          // Upload to cloudinary
          const path = `${currentUser.email}/profile_cover`;
          const token = currentUser.token;
          const cloudinaryImagesUrls = await uploadImages(
            [croppedImage],
            path,
            token
          );
          if (typeof cloudinaryImagesUrls === "string") {
            setError(cloudinaryImagesUrls);
            setIsLoading(false);
            return;
          }
          // Channge cover on server
          const { email, currentCoverPicture } = await updateProfileCover({
            email: userInfo.email,
            cover: cloudinaryImagesUrls[0],
          }).unwrap();
          // Update Cookie
          Cookies.set(
            "user",
            JSON.stringify({
              ...currentUser,
              cover: currentCoverPicture,
            })
          );
          // Update slice user
          dispatch(
            updateCoverImage({
              cover: currentCoverPicture,
            })
          );
          // Create post
          await handleAddPost({
            type: "profileCover",
            user: currentUser.id,
            text: "",
            coverId: undefined,
            imagesList: [currentCoverPicture],
            isSharedTo: "public",
            isFeeling: "",
            checkedOutAt: "",
            tagedFriends: [],
          }).unwrap();
          setIsLoading(false);
        } else {
          console.log("No cropped image");
          setIsLoading(false);
        }
      }
    } catch (e: any) {
      console.log(e);
      setIsLoading(false);
    }
  }, [croppedAreaPixels]);
  return (
    <>
      {showSelectUploadedPhotos && (
        <SelectUploadedCoverPopUp
          setImageUrl={setImageUrl}
          setShowSelectUploadedPhotos={setShowSelectUploadedPhotos}
          userInfo={userInfo}
        />
      )}
      <input
        ref={inputRef}
        type="file"
        id="cover_image_picker"
        name="cover_image_picker"
        accept="image/jpeg, image/png, image/gif, image/webp"
        hidden
        onChange={handlePickPicture}
      />
      {/* Cover image edit */}
      <div className="relative w-full aspect-[27/11] rounded-lg rounded-t-none overflow-hidden">
        {
          // With error
          error && (
            <div className="w-full h-full flex items-center gap-2 justify-center px-10">
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
          )
        }
        {
          // Without image url
          !error && !imageUrl && (
            <img
              src={
                userInfo.cover ||
                "https://res.cloudinary.com/dbrd0cias/image/upload/v1681639252/default_cover_kvidog.png"
              }
              alt=""
              className="w-full h-auto object-cover"
            />
          )
        }

        {
          // With image url
          !error && imageUrl && (
            <>
              {/* Accept form */}
              <div className="fixed top-14 left-0 right-0 px-4 py-2 z-20 flex items-center bg-gray-700 bg-opacity-70 text-white">
                <div className="flex items-center gap-2">
                  <img
                    src="/icons/public.png"
                    alt=""
                    className="w-4 h-4 sm:w-6 sm:h-6 shrink-0 invert"
                  />
                  <span className="text-sm sm:text-base">
                    Your cover photo is public
                  </span>
                </div>
                {/* Button */}
                <div className="flex items-stretch ml-auto gap-2">
                  <button
                    className="py-2 px-5 rounded-md bg-gray-500 active:scale-95 active:bg-gray-600 text-sm sm:text-base"
                    onClick={() => {
                      setImageUrl("");
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="w-[120px] sm:w-[160px] rounded-md bg-blue-600 active:scale-95 active:bg-blue-700 flex justify-center items-center text-sm sm:text-base"
                    onClick={handleUpdateProfileCover}
                  >
                    {!isLoading && "Save changes"}
                    {isLoading && (
                      <BeatLoader
                        color={"white"}
                        loading={isLoading}
                        size={4}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    )}
                  </button>
                </div>
              </div>
              {/* Cropper */}
              <div className="cropper">
                <Cropper
                  image={imageUrl}
                  crop={crop}
                  zoom={zoom}
                  aspect={27 / 11}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  objectFit="horizontal-cover"
                  zoomWithScroll
                />
              </div>
            </>
          )
        }

        <div className="absolute left-0 right-0 bottom-0 h-[80px]">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black h-[80px] opacity-40"></div>
          {isOwner && (
            <button
              className="absolute top-1/2 -translate-y-1/2 right-8 px-3 py-2 rounded-lg active:scale-95 flex gap-2 items-center text-[14px] font-semibold bg-gradient-to-b from-white to-gray-100 active:from-slate-200 active:to-gray-300"
              onClick={() => {
                setShowEditCoverPhotoMenu(!showEditCoverPhotoMenu);
              }}
            >
              <i className="camera_filled_icon scale-[80%]"></i>
              <span className="hidden md:inline">Edit cover photo</span>
            </button>
          )}
        </div>
      </div>
      {showEditCoverPhotoMenu && isOwner && (
        <div
          className="absolute right-8 bottom-[240px] md:bottom-[108px] w-[350px] bg-white dark:bg-[#242526] rounded-lg shadow2 p-2 flex flex-col z-20"
          ref={menuRef}
        >
          <button
            className="flex gap-2 items-center p-2 hover--overlay overflow-hidden relative rounded-lg transition-all duration-100 ease-linear"
            onClick={() => {
              setShowSelectUploadedPhotos(true);
              setShowEditCoverPhotoMenu(false);
            }}
          >
            <i className="photo_icon dark:invert"></i>
            <span className="font-semibold dark:text-[#b0b3b8]">
              Select photo
            </span>
          </button>
          <button
            className="flex gap-2 items-center p-2 hover--overlay overflow-hidden relative rounded-lg transition-all duration-100 ease-linear"
            onClick={() => {
              inputRef.current && inputRef.current.click();
              setShowEditCoverPhotoMenu(false);
            }}
          >
            <i className="upload_icon dark:invert"></i>
            <span className="font-semibold dark:text-[#b0b3b8]">
              Upload photo
            </span>
          </button>
          <div className="h-[0.5px] bg-gray-300 dark:bg-[#3E4042] my-1 mx-2"></div>
          <button
            className="flex gap-2 items-center p-2 hover--overlay overflow-hidden relative rounded-lg transition-all duration-100 ease-linear"
            onClick={() => {
              setShowEditCoverPhotoMenu(false);
            }}
          >
            <i className="trash_icon dark:invert"></i>
            <span className="font-semibold dark:text-[#b0b3b8]">Remove</span>
          </button>
        </div>
      )}
    </>
  );
};

export default CoverImage;
