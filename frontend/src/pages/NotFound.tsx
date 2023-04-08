import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { NotfoundIcon } from "@/svg";

type Props = {};

const NotFound = (props: Props) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="mt-14 flex flex-col items-center justify-center gap-2 max-w-[460px]">
        <NotfoundIcon className="w-[112px] h-auto" />
        <h2 className="text-xl font-bold text-gray-600 mt-2">
          This content isn't available right now
        </h2>
        <p className="text-lg text-center text-gray-500 leading-5">
          When this happens, it's usually because the owner only shared it with
          a small group of people, changed who can see it or it's been deleted.
        </p>
        <button
          className="rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 px-8 py-2 mt-2"
          onClick={() => {
            navigate("/");
          }}
        >
          Go to News Feed
        </button>
        <span
          className="cursor-pointer text-blue-700 hover:underline text-base font-medium"
          onClick={() => {
            navigate(-1);
          }}
        >
          Go back
        </span>
      </div>
    </div>
  );
};

export default NotFound;
