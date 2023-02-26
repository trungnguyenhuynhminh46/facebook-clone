import React, { useEffect, useState } from "react";
import LoginTextInput from "./LoginTextInput";
import logo from "/icons/facebook.svg";
import { useForm } from "react-hook-form";
import { useMediaQuery } from "react-responsive";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { HashLoader } from "react-spinners";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/user";
import { useNavigate } from "react-router-dom";

type Props = {
  setRegisterIsShown: any;
};

const schema = yup.object({
  email: yup
    .string()
    .required("Please enter your email!")
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email!"
    ),
  password: yup.string().required("Please enter your password!"),
});

const LoginForm: React.FC<Props> = ({ setRegisterIsShown }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const isNotLargeScreen = useMediaQuery({
    query: "(max-width: 1024px)",
  });
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });
  const onSubmit = async (inputData: any) => {
    try {
      setIsLoading(true);
      const {
        data: { message, user },
      } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/login`,
        inputData
      );
      setSuccessMsg(message);
      setErrorMsg("");
      Cookies.set("user", JSON.stringify(user));
      dispatch(login(user));
      const timeOutID = setTimeout(() => {
        setIsLoading(false);
        navigate("/");
      }, 2000);
      return () => {
        clearInterval(timeOutID);
      };
    } catch (err: any) {
      setSuccessMsg("");
      setErrorMsg(err.response.data.message);
      setIsLoading(false);
    }
  };
  return (
    <div className="bg-[var(--bg-forth)]">
      <div className="container pt-[12px] pb-[164px] flex flex-col lg:flex-row lg:justify-between lg:gap-40 xl:gap-4 lg:pt-[72px] lg:pb-[206px]">
        <div className="lg:mt-[108px] lg:-translate-x-4">
          <img
            src={logo}
            alt=""
            className="h-[106px] w-auto mx-auto lg:ml-0 lg:-translate-x-3"
          />
          <p className="text-[#1c1e21] text-2xl text-center leading-7 px-4 w-[396px] mx-auto -translate-y-[6px] lg:ml-0 lg:text-left lg:w-full lg:text-[24px] xl:text-[28px] lg:leading-[32px] tracking-[0.04em]">
            Facebook helps you connect and share with the people in your life.
          </p>
        </div>
        <div className="w-full lg:w-auto lg:mt-6">
          <form
            action="#"
            className="pt-[10px] pb-[24px] px-[16px] rounded-lg shadow-lg bg-white mt-[36px] flex flex-col items-center w-[396px] mx-auto lg:mx-0"
            onSubmit={handleSubmit(onSubmit)}
          >
            <LoginTextInput
              type="text"
              placeholder="Email address or phone number"
              name="email"
              control={control}
              errorPosition={isNotLargeScreen ? "bottom" : "left"}
              errorMessage={errors.email?.message || ""}
            />
            <LoginTextInput
              type="password"
              placeholder="Password"
              name="password"
              control={control}
              errorPosition={isNotLargeScreen ? "bottom" : "left"}
              errorMessage={errors.password?.message || ""}
            />
            <div className="w-full pt-[6px]">
              <button className="btn bg-[var(--blue-color)] w-full font-bold flex justify-center items-center h-[48px]">
                {isLoading && (
                  <HashLoader
                    color="white"
                    loading={isLoading}
                    size={16}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                )}
                {!isLoading && "Log in"}
              </button>
            </div>
            <a
              href=""
              className="text-[var(--blue-color)] text-[14px] font-[500] mt-[16px]"
            >
              Forgottern password
            </a>
            {errorMsg && (
              <p className="text-center text-sm text-red-500 mt-3">
                {errorMsg}
              </p>
            )}
            {successMsg && (
              <p className="text-center text-sm text-green-500 mt-3">
                {successMsg}
              </p>
            )}
            <div className="spacer"></div>
            <div className="w-full pt-[6px] flex justify-center">
              <button
                type="button"
                className="btn bg-[var(--green-color)] inline-block text-[17px] font-bold"
                onClick={() => {
                  setRegisterIsShown(true);
                }}
              >
                Create new account
              </button>
            </div>
          </form>
          <p className="text-center text-sm mt-[28px]">
            <a href="" className="font-bold">
              Create a Page
            </a>{" "}
            for a celebrity, brand or business.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
