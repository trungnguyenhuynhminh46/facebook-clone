import React, { useRef, useState } from "react";
import { Details } from "@/types/Details";
import { useUpdateProfileDetailsByEmailMutation } from "@/store/api/usersApi";
import ShowEditDetailPopUp from "./ShowEditDetailPopUp";
import DetailsInput from "./DetailsInput";

type Props = {
  isOwner: boolean;
  userInfo: any;
};

type DetailInfoProps = {
  details: Details;
};

const DetailInfo: React.FC<DetailInfoProps> = ({ details }) => {
  return (
    <>
      {/* Details */}
      {details.job && !details.workplace && (
        <div className="mt-[10px] flex items-center gap-[10px] text-[15px] text-[var(--color-primary)] dark:text-[#E4E6EB]">
          <img src="/icons/job.png" alt="" className="invert-[60%]" />
          Works as {details?.job}
        </div>
      )}
      {details.job && details.workplace && (
        <div className="mt-[10px] flex items-center gap-[10px] text-[15px] text-[var(--color-primary)] dark:text-[#E4E6EB]">
          <img src="/icons/job.png" alt="" className="invert-[60%]" />
          <p>
            Works as {details?.job} at <b>{details?.workplace}</b>
          </p>
        </div>
      )}
      {!details.job && details.workplace && (
        <div className="mt-[10px] flex items-center gap-[10px] text-[15px] text-[var(--color-primary)] dark:text-[#E4E6EB]">
          <img src="/icons/job.png" alt="" className="invert-[60%]" />
          <p>Works at {details?.workplace}</p>
        </div>
      )}
      {details.relationship && (
        <div className="mt-[10px] flex items-center gap-[10px] text-[15px] text-[var(--color-primary)] dark:text-[#E4E6EB]">
          <img src="/icons/relationship.png" alt="" className="invert-[60%]" />
          {details.relationship}
        </div>
      )}
      {details?.college && (
        <div className="mt-[10px] flex items-center gap-[10px] text-[15px] text-[var(--color-primary)] dark:text-[#E4E6EB]">
          <img src="/icons/studies.png" className="invert-[60%]" alt="" />
          Studied at {details?.college}
        </div>
      )}
      {details?.highSchool && (
        <div className="mt-[10px] flex items-center gap-[10px] text-[15px] text-[var(--color-primary)] dark:text-[#E4E6EB]">
          <img src="/icons/studies.png" className="invert-[60%]" alt="" />
          Studied at {details?.highSchool}
        </div>
      )}
      {details?.currentCity && (
        <div className="mt-[10px] flex items-center gap-[10px] text-[15px] text-[var(--color-primary)] dark:text-[#E4E6EB]">
          <img src="/icons/home.png" className="invert-[60%]" alt="" />
          Lives in {details?.currentCity}
        </div>
      )}
      {details?.hometown && (
        <div className="mt-[10px] flex items-center gap-[10px] text-[15px] text-[var(--color-primary)] dark:text-[#E4E6EB]">
          <img src="/icons/home.png" className="invert-[60%]" alt="" />
          From {details?.hometown}
        </div>
      )}
      {details?.hometown && (
        <div className="mt-[10px] flex items-center gap-[10px] text-[15px] text-[var(--color-primary)] dark:text-[#E4E6EB]">
          <img src="/icons/instagram.png" className="invert-[60%]" alt="" />
          <a
            href={`https://www.instagram.com/${details?.instagram}`}
            target="_blank"
          >
            {details?.instagram}
          </a>
        </div>
      )}

      {/* End detail */}
    </>
  );
};

const IntroMenu: React.FC<Props> = ({ isOwner, userInfo }) => {
  const saveBtn = useRef<HTMLButtonElement>(null);
  const [handleUpdateProfileDetails] = useUpdateProfileDetailsByEmailMutation();
  const initialDetails = {
    bio: userInfo.details.bio ? userInfo.details.bio : "",
    otherName: userInfo.details.otherName ? userInfo.details.otherName : "",
    job: userInfo.details.job ? userInfo.details.job : "",
    workplace: userInfo.details.workplace ? userInfo.details.workplace : "",
    highSchool: userInfo.details.highSchool ? userInfo.details.highSchool : "",
    college: userInfo.details.college ? userInfo.details.college : "",
    currentCity: userInfo.details.currentCity
      ? userInfo.details.currentCity
      : "",
    hometown: userInfo.details.hometown ? userInfo.details.hometown : "",
    relationship: userInfo.details.relationship
      ? userInfo.details.relationship
      : "",
    instagram: userInfo.details.instagram ? userInfo.details.instagram : "",
  };
  const [details, setDetails] = useState<Details>(initialDetails);
  const isAddDetails =
    details.otherName === "" &&
    details.workplace === "" &&
    details.college === "" &&
    details.hometown === "" &&
    details.instagram === "";
  const [showEditBio, setShowEditBio] = useState<boolean>(false);
  const [bioEditorText, setBioEditorText] = useState<string>("");
  const [max, setMax] = useState<number>(
    100 - (details.bio ? details.bio.length : 0)
  );
  const [showEditDetails, setShowEditDetails] = useState<boolean>(false);
  // Handlers
  const handleSaveDetails = async () => {
    try {
      if (max >= 0) {
        // Send update request to server
        const { email, newDetails } = await handleUpdateProfileDetails({
          email: userInfo.email,
          details: {
            ...details,
            bio: bioEditorText,
          },
        }).unwrap();
        // Update state details from response
        setDetails(newDetails);
        setShowEditBio(false);
      }
    } catch (error: any) {
      console.log(error);
      setShowEditBio(false);
    }
  };
  return (
    <div className="rounded-lg bg-white dark:bg-[#242526] w-full px-3 py-4 flex flex-col items-stretch gap-5">
      <h1 className="text-xl font-bold dark:text-[#E4E6EB]">Intro</h1>
      {details.bio && !showEditBio && (
        <p className="text-center dark:text-[#E4E6EB]">{details.bio}</p>
      )}
      {showEditBio && (
        <DetailsInput
          details={details}
          name="bio"
          setDetails={setDetails}
          setShow={setShowEditBio}
          userInfo={userInfo}
          placeholder="Describe who you are"
        />
      )}
      {isOwner && !showEditBio && (
        <button
          className="dark:text-[#E4E6EB] rounded-lg bg-gray-200 dark:bg-[#3A3B3C] font-semibold flex justify-center hover:bg-gray-300 active:scale-95 py-2"
          onClick={() => {
            setShowEditBio(true);
            setBioEditorText(details.bio);
          }}
        >
          {details.bio && "Edit bio"}
          {!details.bio && "Add bio"}
        </button>
      )}
      <DetailInfo details={details} />
      {isOwner && (
        <button
          className="dark:text-[#E4E6EB] rounded-lg bg-gray-200 dark:bg-[#3A3B3C] font-semibold flex justify-center hover:bg-gray-300 active:scale-95 py-2"
          onClick={() => {
            setShowEditBio(false);
            setShowEditDetails(true);
          }}
        >
          {isAddDetails && "Add Detail"}
          {!isAddDetails && "Edit details"}
        </button>
      )}
      {showEditDetails && (
        <ShowEditDetailPopUp
          userInfo={userInfo}
          setDetails={setDetails}
          setShowEditDetails={setShowEditDetails}
          details={details}
        />
      )}
    </div>
  );
};

export default IntroMenu;
