import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import DotLoader from "react-spinners/DotLoader";
import Style from "./style.module.css";
import { ExclamationCircle } from "@/svg";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { login, logout } from "@/store/slices/user";
import Cookies from "js-cookie";
import { selectCurrentUser } from "@/store/selectors/user";

type Props = {};

const Verify = (props: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const { token } = useParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const [showSendEmailButton, setShowSendEmailButton] = useState(true);
  const [showLogOutButton, setShowLogOutButton] = useState(false);

  // Effects
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const {
          data: { message, user },
        } = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/user/verify`,
          { token },
          {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          }
        );
        setSuccess(message);
        setError("");
        setLoading(false);
        Cookies.set("user", JSON.stringify(user));
        dispatch(login(user));
        const timeOutID = setTimeout(() => {
          navigate("/");
        }, 2000);
        return () => {
          clearTimeout(timeOutID);
        };
      } catch (err: any) {
        setError(err.response.data.message);
        setSuccess("");
        setLoading(false);
      }
    })();
  }, []);
  // Handlers
  const handleResentEmail = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/resentEmail`,
        {},
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      setError(data.message);
      setShowLogOutButton(true);
      setShowSendEmailButton(false);
    } catch (err: any) {
      setError(err.response.data.message);
      setShowLogOutButton(true);
      setShowSendEmailButton(false);
    }
  };
  return (
    <div className="bg-[var(--bg-secondary)] min-h-screen w-full flex justify-center items-center">
      {loading && (
        <div className="flex-1 max-w-[400px] rounded-md bg-white overflow-hidden">
          <div className="text-lg font-bold text-center py-2 border-b border-solid border-gray-200">
            Verification is being processed
          </div>
          <div className="flex flex-col items-center justify-center gap-2 p-4">
            <span className="text-sm font-medium">
              {" "}
              This'll be take a while
            </span>
            <BeatLoader
              color="#1876f2"
              loading={loading}
              size={8}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </div>
      )}
      {!loading && success && (
        <div className="flex-1 max-w-[400px] rounded-md bg-white overflow-hidden">
          <div className="text-lg font-bold text-center py-2 border-b border-solid border-gray-200">
            {success}
          </div>
          <div className="flex flex-col items-center justify-center gap-2 p-4">
            <span className="text-sm font-medium">
              You will be redirected to home page now
            </span>
            <DotLoader
              color="#2ecc71"
              loading={true}
              size={16}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </div>
      )}
      {!loading && error && (
        <div className="flex-1 max-w-[400px] rounded-md bg-white overflow-hidden">
          <div className="text-lg font-bold py-2 border-b border-solid border-gray-200 flex justify-center items-center gap-2">
            <ExclamationCircle />
            <span>Something went wrong!</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 p-4">
            <span className="text-sm font-medium">{error}</span>
            {showSendEmailButton && (
              <button
                className="py-2 px-3 rounded-md text-white font-medium bg-[var(--blue-color)]"
                onClick={handleResentEmail}
              >
                Resent verification email
              </button>
            )}
            {showLogOutButton && (
              <button
                className="py-2 px-3 rounded-md text-white font-medium bg-[var(--blue-color)]"
                onClick={() => {
                  dispatch(logout());
                  Cookies.set("user", "");
                }}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Verify;
