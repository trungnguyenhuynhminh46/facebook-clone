import axios from "axios";
import React, { useState } from "react";

type Props = {
  setMenu: React.Dispatch<React.SetStateAction<string>>;
  userInfo: {
    picture: string;
    email: string;
    username: string;
  } | null;
  setSendBy: React.Dispatch<React.SetStateAction<string>>;
  sendBy: string;
};

const ConfirmForm: React.FC<Props> = ({
  setMenu,
  userInfo,
  setSendBy,
  sendBy,
}) => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSendCode = async () => {
    try {
      if (userInfo) {
        setIsLoading(true);
        // Send code
        const {
          data: { message },
        } = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/user/sendValidationCode`,
          { email: userInfo.email }
        );
        // Change to code form
        setSuccess(message);
        setError("");
        setIsLoading(false);
        setMenu("code");
      }
    } catch (err: any) {
      setError(err.response.data.message);
      setSuccess("");
      setIsLoading(false);
    }
  };
  return (
    <div className="flex-1 max-w-[320px] sm:max-w-[400px] bg-white rounded-lg shadow2">
      <p className="p-3 border-b border-solid border-gray-200 text-xl font-bold">
        Reset Your Password
      </p>
      <div className="w-full grid grid-cols-2 gap-10 p-4 border-b border-solid border-gray-200">
        <div className="flex flex-col gap-3">
          <p className="text-sm text-gray-500">
            How do you want to receive the code to reset your password
          </p>
          <div className="flex gap-2">
            <input
              type="radio"
              name="sendby"
              id="sendBy"
              value="email"
              onClick={() => {
                setSendBy("email");
              }}
              defaultChecked={sendBy === "email"}
            />
            <p className="text-sm text-gray-500" title={userInfo?.email}>
              Send code via email{" "}
              {userInfo?.email && userInfo?.email.length < 16
                ? userInfo?.email
                : userInfo?.email.slice(0, 16) + "..."}
            </p>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}
        </div>
        <div className="flex flex-col gap-1 items-center justify-start">
          <img
            src={userInfo?.picture}
            alt=""
            className="w-14 h-14 rounded-full"
          />
          <p className="text-sm text-gray-500" title={userInfo?.email}>
            {userInfo?.email && userInfo?.email.length < 16
              ? userInfo?.email
              : userInfo?.email.slice(0, 16) + "..."}
          </p>
          <p className="text-sm text-gray-500">
            {userInfo?.username && userInfo?.username.length < 16
              ? userInfo?.username
              : userInfo?.username.slice(0, 16) + "..."}
          </p>
        </div>
      </div>
      <div className="p-4 flex justify-end gap-3">
        <button
          type="button"
          className="bg-gray-200 hover:bg-gray-300 active:bg-gray-400 py-1 px-3 rounded-md"
          onClick={() => {
            setMenu("search");
          }}
        >
          Not You?
        </button>
        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-800 active:bg-blue-900 py-1 px-3 rounded-md text-white"
          onClick={handleSendCode}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default ConfirmForm;
