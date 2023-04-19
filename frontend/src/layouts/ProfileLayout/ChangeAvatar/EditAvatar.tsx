import classNames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import Cropper from "react-easy-crop";
import Style from "./style.module.css";
import ReactDom from "react-dom";
import { Area } from "react-easy-crop/types";
import getCroppedImg from "@/helpers/cropImage";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/selectors/user";
import uploadImages from "@/helpers/upload";
import { useUpdateProfilePictureByEmailMutation } from "@/store/api/usersApi";
import Cookies from "js-cookie";
import { updateProfileImage } from "@/store/slices/user";
import { BeatLoader } from "react-spinners";
import { useAddPostMutation } from "@/store/api/postsApi";

type Props = {
  imageUrl: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  setShowPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  userInfo: any;
};

type DiscardFormProps = {
  setShowDiscardForm: React.Dispatch<React.SetStateAction<boolean>>;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  setShowPopUp: React.Dispatch<React.SetStateAction<boolean>>;
};

const DiscardForm: React.FC<DiscardFormProps> = ({
  setImageUrl,
  setShowDiscardForm,
  setShowPopUp,
}) => {
  return ReactDom.createPortal(
    <div className="fixed inset-0 flex justify-center items-center z-20">
      {/* Background */}
      <div className="absolute inset-0 bg-white opacity-80"></div>
      {/* Form */}
      <div className="relative flex-1 max-w-[548px] rounded-lg shadow2 bg-white overflow-hidden border border-solid border-gray-200 mx-4">
        {/* Header */}
        <div className="w-full relative flex justify-center items-center border-b border-solid border-gray-300">
          <h1 className="py-5 text-xl font-bold">Discard Changes</h1>
          <button
            className="absolute top-1/2 -translate-y-1/2 right-4 flex justify-center items-center rounded-full bg-gray-200 p-2"
            onClick={() => setShowDiscardForm(false)}
          >
            <i className="exit_icon scale-80"></i>
          </button>
        </div>
        {/* Alert */}
        <h1 className="w-full text-left px-4 pt-2 mb-5">
          Are you sure you want to discard your changes?
        </h1>
        {/* Form options */}
        <div className="flex items-stretch h-[70px] justify-end gap-2 p-4">
          <button
            className="px-3 flex justify-center items-center border-none outline-none rounded-md bg-transparent hover:bg-gray-200 text-[15px] font-medium text-blue-500 active:bg-blue-100 active:scale-95"
            onClick={() => {
              setShowDiscardForm(false);
            }}
          >
            Cancel
          </button>
          <button
            className="relative px-10 flex justify-center items-center bg-blue-500 font-medium text-white rounded-md hover--overlay active:bg-blue-600 active:scale-95"
            onClick={async () => {
              setShowDiscardForm(false);
              setImageUrl("");
              setShowPopUp(false);
            }}
          >
            Discard
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("comfirm-portal")!
  );
};

const EditAvatar: React.FC<Props> = ({
  imageUrl,
  setImageUrl,
  setShowPopUp,
  userInfo,
}) => {
  const dispatch = useDispatch();
  const [updateProfilePictureByEmail] =
    useUpdateProfilePictureByEmailMutation();
  const [handleAddPost] = useAddPostMutation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const currentUser = useSelector(selectCurrentUser);
  const [showDiscardForm, setShowDiscardForm] = useState<boolean>(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const sliderRef = useRef<HTMLInputElement>(null);
  const [inputText, setInputText] = useState<string>("");
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  // Handle Cropper
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );
  const handleCropImage = useCallback(async () => {
    try {
      if (croppedAreaPixels) {
        const croppedImage = await getCroppedImg(imageUrl, croppedAreaPixels);
        if (croppedImage) {
          setImageUrl(croppedImage);
          setCrop({ x: 0, y: 0 });
          setZoom(1);
        } else {
          console.log("No cropped image");
        }
      }
    } catch (e: any) {
      console.log(e);
    }
  }, [croppedAreaPixels]);
  const handleUpdateProfileImage = async () => {
    setIsLoading(true);
    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
      if (imageUrl !== userInfo.picture) {
        try {
          // Is a cloudinary string
          // Update profile picture (server)
          const { email, currentProfilePicture } =
            await updateProfilePictureByEmail({
              email: userInfo.email,
              pictureUrl: imageUrl,
            }).unwrap();
          // Update currentUser profile picture and Cookie
          Cookies.set(
            "user",
            JSON.stringify({
              ...currentUser,
              picture: currentProfilePicture,
            })
          );
          dispatch(updateProfileImage({ profileUrl: currentProfilePicture }));
          // Update profile picture of post's owner

          // Create Post
          await handleAddPost({
            type: "profilePicture",
            user: currentUser.id,
            text: "",
            coverId: undefined,
            imagesList: [currentProfilePicture],
            isSharedTo: "public",
            isFeeling: "",
            checkedOutAt: "",
            tagedFriends: [],
          }).unwrap();
          setIsLoading(false);
        } catch (error: any) {
          console.log(error);
          setIsLoading(false);
          // setError(error.response.data.message);
        }
      }
    } else if (imageUrl.startsWith("blob:") || imageUrl.startsWith("data:")) {
      try {
        // Is an base64 string
        const path = `${currentUser.email}/profile_pictures`;
        const token = currentUser.token;
        const cloudinaryImagesUrls = await uploadImages(
          [imageUrl],
          path,
          token
        );
        // console.log(cloudinaryImagesUrls);
        if (typeof cloudinaryImagesUrls === "string") {
          setError(cloudinaryImagesUrls);
          setIsLoading(false);
          return;
        }
        // Update profile picture (server)
        const { email, currentProfilePicture } =
          await updateProfilePictureByEmail({
            email: userInfo.email,
            pictureUrl: cloudinaryImagesUrls[0],
          }).unwrap();
        // Update currentUser profile picture and Cookie
        Cookies.set(
          "user",
          JSON.stringify({
            ...currentUser,
            picture: currentProfilePicture,
          })
        );
        dispatch(updateProfileImage({ profileUrl: currentProfilePicture }));
        // Update profile picture of post's owner

        // Create Post
        await handleAddPost({
          type: "profilePicture",
          user: currentUser.id,
          text: "",
          coverId: undefined,
          imagesList: [currentProfilePicture],
          isSharedTo: "public",
          isFeeling: "",
          checkedOutAt: "",
          tagedFriends: [],
        }).unwrap();
        setIsLoading(false);
      } catch (error: any) {
        console.log(error);
        setIsLoading(false);
        // setError(error.response.data.message);
      }
    } else {
      console.log("Strange type: ", imageUrl);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${inputRef.current.scrollHeight + 2}px`;
    }
  }, [inputText]);
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex justify-center items-center z-20">
      {showDiscardForm && (
        <DiscardForm
          setImageUrl={setImageUrl}
          setShowDiscardForm={setShowDiscardForm}
          setShowPopUp={setShowPopUp}
        />
      )}
      {/* Background */}
      <div className="absolute inset-0 bg-white opacity-80"></div>
      {/* Form */}
      <div className="relative flex-1 max-w-[700px] rounded-lg shadow2 bg-white overflow-hidden border border-solid border-gray-200 mx-4">
        {/* Error */}
        {error && (
          <div className="absolute z-10 inset-0 bg-white bg-opacity-95 flex justify-center items-center gap-4">
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
        {/* Loading */}
        {isLoading && (
          <div className="absolute inset-0 bg-white opacity-95 flex justify-center items-center z-10">
            <BeatLoader
              color="#3498db"
              loading={isLoading}
              size={16}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        )}
        {/* Header */}
        <div className="w-full relative flex justify-center items-center border-b border-solid border-gray-300">
          <h1 className="py-5 text-xl font-bold">Update profile picture</h1>
          <button
            className="absolute top-1/2 -translate-y-1/2 right-4 flex justify-center items-center rounded-full bg-gray-200 p-2"
            onClick={() => {
              setShowDiscardForm(true);
            }}
          >
            <i className="exit_icon scale-80"></i>
          </button>
        </div>
        {/* Content */}
        <div className="relative w-full p-3 min-h-[400px] overflow-y-auto group border-b border-solid border-gray-300">
          <textarea
            name="desc"
            id="desc"
            ref={inputRef}
            value={inputText}
            onChange={(e) => {
              setInputText(inputRef.current?.value || "");
            }}
            className="relative resize-none w-full min-h-[100px] rounded-md border border-solid border-gray-300 outline-blue-400 outline-offset-4 py-6 px-4"
            onFocus={() => {
              setIsFocus(true);
            }}
            onBlur={() => {
              setIsFocus(false);
            }}
          ></textarea>
          <span
            className={classNames(
              "absolute top-6 left-6 text-gray-500 transition-all duration-100 ease-linear",
              {
                ["-translate-y-1 text-sm"]:
                  isFocus || !!inputRef.current?.value,
              },
              {
                ["!text-blue-400"]: isFocus,
              }
            )}
          >
            Description
          </span>
          <div className="cropper-container">
            <Cropper
              image={imageUrl}
              crop={crop}
              zoom={zoom}
              aspect={1 / 1}
              cropShape="round"
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              zoomWithScroll
              showGrid={false}
            />
          </div>
          <div className={Style["slider"]}>
            <button
              className="outline-none border-none flex items-center"
              onClick={() => {
                sliderRef.current?.stepDown();
                setZoom(Number(sliderRef.current?.value));
              }}
            >
              <i className="minus_icon"></i>
            </button>
            <input
              type="range"
              ref={sliderRef}
              name=""
              id=""
              min={1}
              max={3}
              step={0.2}
              value={zoom}
              onChange={(e) => {
                setZoom(Number(e.target.value));
              }}
            />
            <button
              className="outline-none border-none flex items-center"
              onClick={() => {
                sliderRef.current?.stepUp();
                setZoom(Number(sliderRef.current?.value));
              }}
            >
              <i className="plus_icon"></i>
            </button>
          </div>
          {/* Functions */}
          <div className="relative w-full flex justify-center gap-3 items-center mt-5 mb-2">
            <button
              className="flex justify-center items-center gap-2 p-2 bg-gray-200 font-bold rounded-md active:bg-gray-300 active:scale-95"
              onClick={handleCropImage}
            >
              <i className="crop_icon"></i>
              <span>Crop photo</span>
            </button>
            <button className="flex justify-center items-center gap-2 p-2 bg-gray-200 font-bold rounded-md active:bg-gray-300 active:scale-95">
              <i className="temp_icon"></i>
              <span>Make Temporary</span>
            </button>
          </div>
          {/* Note */}
          <p className="px-4 text-gray-500 text-lg tracking-wide">
            Your profile picture for{" "}
            <span className="text-gray-600 font-semibold">
              {userInfo.username}
            </span>{" "}
            will also be updated on Instagram.{" "}
            <a href="#" className="text-blue-500">
              Manage sync settings
            </a>
          </p>
        </div>
        {/* Form options */}
        <div className="flex items-stretch h-[70px] justify-end gap-2 p-4">
          <button
            className="px-3 flex justify-center items-center border-none outline-none rounded-md bg-transparent hover:bg-gray-200 text-[15px] font-medium text-blue-500 active:bg-blue-100 active:scale-95"
            onClick={() => {
              setImageUrl("");
            }}
          >
            Cancel
          </button>
          <button
            className="relative px-10 flex justify-center items-center bg-blue-500 font-medium text-white rounded-md hover--overlay active:bg-blue-600 active:scale-95"
            onClick={handleUpdateProfileImage}
          >
            Save
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("portal")!
  );
};

export default EditAvatar;
