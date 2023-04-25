import { Details } from "@/types/Details";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import DetailsComponent from "./DetailsComponent";
import DetailsInput from "./DetailsInput";

type Props = {
  userInfo: any;
  setDetails: React.Dispatch<React.SetStateAction<Details>>;
  setShowEditDetails: React.Dispatch<React.SetStateAction<boolean>>;
  details: Details;
};

const ShowEditDetailPopUp: React.FC<Props> = ({
  userInfo,
  setDetails,
  setShowEditDetails,
  details,
}) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex justify-center items-center z-20">
      {/* Background */}
      <div className="absolute inset-0 bg-white dark:bg-[#242526] opacity-80"></div>
      {/* Form */}
      <div className="relative flex-1 max-w-[700px] rounded-lg shadow2 bg-white dark:bg-[#242526] overflow-hidden border border-solid border-gray-200 dark:border-[#3E4042] mx-4">
        {/* Header */}
        <div className="w-full relative flex justify-center items-center border-b border-solid border-gray-300 dark:border-[#3E4042]">
          <h1 className="py-5 text-xl font-bold dark:text-[#E4E6EB]">
            Edit detail
          </h1>
          <button
            className="absolute top-1/2 -translate-y-1/2 right-4 flex justify-center items-center rounded-full bg-gray-200 dark:bg-[#4E4F50] p-2"
            onClick={() => {
              setShowEditDetails(false);
            }}
          >
            <i className="exit_icon scale-80 dark:invert"></i>
          </button>
        </div>
        {/* Content */}
        <div className="py-4 px-8 max-h-[600px] overflow-auto custom-scrollbar">
          <h1 className="text-lg font-semibold dark:text-[#E4E6EB]">
            Customize your intro
          </h1>
          <h4 className="font-light text-gray-500 dark:text-[#b0b3b8]">
            Details you select will be public.
          </h4>
          <h1 className="text-xl font-bold mt-4 dark:text-[#E4E6EB]">
            Other Name
          </h1>
          {Object.keys(details)
            .slice(1, 2)
            .map((name) => {
              if (name !== "bio") {
                return (
                  <DetailsComponent
                    key={name}
                    userInfo={userInfo}
                    details={details}
                    name={name as keyof Details}
                    setDetails={setDetails}
                  />
                );
              }
            })}
          <h1 className="text-xl font-bold mt-4 dark:text-[#E4E6EB]">Work</h1>
          {Object.keys(details)
            .slice(2, 4)
            .map((name) => {
              if (name !== "bio") {
                return (
                  <DetailsComponent
                    key={name}
                    userInfo={userInfo}
                    details={details}
                    name={name as keyof Details}
                    setDetails={setDetails}
                  />
                );
              }
            })}
          <h1 className="text-xl font-bold mt-4 dark:text-[#E4E6EB]">
            Education
          </h1>
          {Object.keys(details)
            .slice(4, 6)
            .map((name) => {
              if (name !== "bio") {
                return (
                  <DetailsComponent
                    key={name}
                    userInfo={userInfo}
                    details={details}
                    name={name as keyof Details}
                    setDetails={setDetails}
                  />
                );
              }
            })}
          <h1 className="text-xl font-bold mt-4 dark:text-[#E4E6EB]">
            Current City
          </h1>
          {Object.keys(details)
            .slice(6, 8)
            .map((name) => {
              if (name !== "bio") {
                return (
                  <DetailsComponent
                    key={name}
                    userInfo={userInfo}
                    details={details}
                    name={name as keyof Details}
                    setDetails={setDetails}
                  />
                );
              }
            })}
          <h1 className="text-xl font-bold mt-4 dark:text-[#E4E6EB]">Others</h1>
          {Object.keys(details)
            .slice(8)
            .map((name) => {
              if (name !== "bio") {
                return (
                  <DetailsComponent
                    key={name}
                    userInfo={userInfo}
                    details={details}
                    name={name as keyof Details}
                    setDetails={setDetails}
                  />
                );
              }
            })}
        </div>
      </div>
    </div>,
    document.getElementById("portal")!
  );
};

export default ShowEditDetailPopUp;
