import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMediaQuery } from "react-responsive";
import { useForm } from "react-hook-form";
import TextInput from "@/components/TextInput";
import axios from "axios";
import { Link } from "react-router-dom";

type Props = {
  setMenu: React.Dispatch<React.SetStateAction<string>>;
  setUserInfo: React.Dispatch<
    React.SetStateAction<{
      picture: string;
      email: string;
      username: string;
    } | null>
  >;
};

const schema = yup.object({
  email: yup
    .string()
    .required("Please enter your email!")
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email!"
    ),
});

const MainForm: React.FC<Props> = ({ setMenu, setUserInfo }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
    },
    resolver: yupResolver(schema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });
  // Handlers
  const onSubmit = async (data: { email: string }) => {
    try {
      setIsLoading(true);
      const { email } = data;
      // Find user with email
      const {
        data: { message, user },
      } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/getUserByEmail`,
        {
          email,
        }
      );
      setUserInfo(user);
      setMenu("confirm");
      setSuccess(message);
      setError("");
      setIsLoading(false);
    } catch (err: any) {
      setError(err.response.data.message);
      setSuccess("");
      setIsLoading(false);
    }
  };
  return (
    <form
      action=""
      onSubmit={handleSubmit(onSubmit)}
      className="flex-1 max-w-[320px] sm:max-w-[400px] bg-white rounded-lg shadow2"
    >
      <p className="p-3 border-b border-solid border-gray-200 text-xl font-bold">
        Find your account
      </p>
      <div className="flex flex-col gap-2 border-b border-solid border-gray-200 p-3">
        <p className="text-sm text-gray-700">
          Please enter your email address or mobile number to search for your
          acount
        </p>
        <div className="flex justify-center">
          <div className="flex-1 max-w-[90%] flex flex-col gap-2">
            <TextInput
              type="text"
              placeholder="Email address or phone number"
              name="email"
              control={control}
              errorPosition={isNotLargeScreen ? "bottom" : "left"}
              errorMessage={errors.email?.message || ""}
              className="text-sm"
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            {success && <p className="text-sm text-green-600">{success}</p>}
          </div>
        </div>
      </div>
      <div className="p-4 flex justify-end gap-3">
        <Link
          to="/login"
          type="button"
          className="bg-gray-200 hover:bg-gray-300 active:bg-gray-400 py-1 px-3 rounded-md"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-800 active:bg-blue-900 py-1 px-3 rounded-md text-white"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default MainForm;
