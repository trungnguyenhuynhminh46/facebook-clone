import { Details } from "@/types/Details";
import React, { useState } from "react";
import DetailsInput from "./DetailsInput";

type Props = {
  userInfo: any;
  details: Details;
  name: keyof Details;
  setDetails: React.Dispatch<React.SetStateAction<Details>>;
};

const DetailsComponent: React.FC<Props> = ({
  userInfo,
  details,
  name,
  setDetails,
}) => {
  const placeholderMap = {
    bio: "Add bio",
    otherName: "Add other name",
    job: "Add job",
    workplace: "Add work place",
    highSchool: "Add highschool",
    college: "Add college",
    currentCity: "Add current city",
    hometown: "Add hometown",
    relationship: "Add relationship",
    instagram: "Add instagram",
  };
  const iconMap = {
    bio: "",
    otherName: "studies",
    job: "job",
    workplace: "job",
    highSchool: "studies",
    college: "studies",
    currentCity: "home",
    hometown: "home",
    relationship: "relationship",
    instagram: "home",
  };
  const [show, setShow] = useState<boolean>(false);
  const content = details[name];
  return (
    <>
      <div
        className="cursor-pointer flex gap-2 items-center my-4"
        onClick={() => {
          setShow(true);
        }}
      >
        {!content && !show && (
          <>
            <i className="rounded_plus_icon"></i>
            <span className="text-blue-500">{placeholderMap[name]}</span>
          </>
        )}
        {content && (
          <>
            <img src={`/icons/${iconMap[name]}.png`} alt="" />
            <span>{content}</span>
            <i className="edit_icon ml-auto"></i>
          </>
        )}
      </div>
      {show && (
        <DetailsInput
          userInfo={userInfo}
          details={details}
          name={name}
          setDetails={setDetails}
          setShow={setShow}
          placeholder={placeholderMap[name]}
        />
      )}
    </>
  );
};

export default DetailsComponent;
