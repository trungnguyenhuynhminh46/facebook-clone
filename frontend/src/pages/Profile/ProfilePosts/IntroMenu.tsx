import React from "react";

type Props = {
  isOwner: boolean;
};

const IntroMenu: React.FC<Props> = ({ isOwner }) => {
  return (
    <div className="rounded-lg bg-white w-full px-3 py-4 flex flex-col items-stretch gap-5">
      <h1 className="text-xl font-bold">Intro</h1>
      <p className="text-center">blablabla</p>
      {isOwner && (
        <button className="rounded-lg bg-gray-200 font-semibold flex justify-center hover:bg-gray-300 active:scale-95 py-2">
          Add Bio
        </button>
      )}
      {isOwner && (
        <button className="rounded-lg bg-gray-200 font-semibold flex justify-center hover:bg-gray-300 active:scale-95 py-2">
          Edit details
        </button>
      )}
    </div>
  );
};

export default IntroMenu;
