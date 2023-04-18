import useOnClickOutside from "@/hooks/useOnClickOutside";
import { useUpdateProfileDetailsByEmailMutation } from "@/store/api/usersApi";
import { Details } from "@/types/Details";
import React, { useRef, useState } from "react";

type Props = {
  userInfo: any;
  details: Details;
  name: keyof Details;
  setDetails: React.Dispatch<React.SetStateAction<Details>>;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  placeholder: string;
};

const DetailsInput: React.FC<Props> = ({
  userInfo,
  details,
  name,
  setDetails,
  setShow,
  placeholder,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(wrapperRef, () => {
    setShow(false);
  });
  const [handleUpdateProfileDetails] = useUpdateProfileDetailsByEmailMutation();
  const saveBtn = useRef<HTMLButtonElement>(null);
  const [text, setText] = useState<string>(details[name]);
  const [max, setMax] = useState<number>(
    100 - (details[name] ? details[name].length : 0)
  );
  //   Handlers
  const handleSaveDetails = async () => {
    try {
      if (max >= 0) {
        // Send update request to server
        const { email, newDetails } = await handleUpdateProfileDetails({
          email: userInfo.email,
          details: {
            ...details,
            [name]: text,
          },
        }).unwrap();
        // Update state details from response
        setDetails(newDetails);
        setShow(false);
      }
    } catch (error: any) {
      console.log(error);
      setShow(false);
    }
  };
  return (
    <>
      {!(name === "relationship") && (
        <div className="w-full flex flex-col gap-1" ref={wrapperRef}>
          <textarea
            name=""
            id=""
            className="resize-none h-[80px] text-center py-2 px-3 placeholder:text-gray-500 focus:placeholder:text-gray-300 bg-gray-100 focus:bg-white outline-none border border-solid border-gray-300 focus:border-blue-600 rounded-lg font-semibold"
            placeholder={placeholder}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setMax(100 - e.target.value.length);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                saveBtn.current?.click();
              }
            }}
          />
          <p className="text-[12px] text-gray-500 ml-auto">
            <span>{max}</span> characters remaining
          </p>
          <div className="h-[36px] flex justify-between items-stretch">
            <p className="flex gap-1 items-center">
              <img src="/icons/public.png" className="scale-[65%]" alt="" />
              Public
            </p>
            <div className="flex gap-1 items-stretch">
              <button
                className="relative hover--overlay rounded-lg bg-gray-300  text-gray-700 font-semibold px-3"
                onClick={() => {
                  setShow(false);
                }}
              >
                Cancel
              </button>
              <button
                ref={saveBtn}
                className="relative hover--overlay rounded-lg bg-blue-600  text-white font-semibold px-3 disabled:pointer-events-none disabled:bg-gray-300 disabled:text-gray-400"
                disabled={text.length === 0 || max < 0}
                onClick={handleSaveDetails}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {name === "relationship" && (
        <div className="w-full flex flex-col gap-1" ref={wrapperRef}>
          <select
            name=""
            id=""
            className="w-full h-[36px] focus-visible:outline-none text-[15px] leading-[20px] text-[#1c1e21] pl-2 pr-5 border border-solid border-[#ccd0d5] rounded-[4px]"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          >
            <option value="">Status</option>
            <option value="Single">Single</option>
            <option value="In a relationship">In a relationship</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
          </select>
          <div className="h-[36px] flex justify-between items-stretch mt-2">
            <p className="flex gap-1 items-center">
              <img src="/icons/public.png" className="scale-[65%]" alt="" />
              Public
            </p>
            <div className="flex gap-1 items-stretch">
              <button
                className="relative hover--overlay rounded-lg bg-gray-300  text-gray-700 font-semibold px-3"
                onClick={() => {
                  setShow(false);
                }}
              >
                Cancel
              </button>
              <button
                ref={saveBtn}
                className="relative hover--overlay rounded-lg bg-blue-600  text-white font-semibold px-3 disabled:pointer-events-none disabled:bg-gray-300 disabled:text-gray-400"
                onClick={handleSaveDetails}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailsInput;
