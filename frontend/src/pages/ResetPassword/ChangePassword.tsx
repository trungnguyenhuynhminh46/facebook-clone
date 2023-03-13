import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMediaQuery } from "react-responsive";
import { useForm } from "react-hook-form";
import TextInput from "@/components/TextInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Props = {
  setMenu: React.Dispatch<React.SetStateAction<string>>;
  email: string;
};

const schema = yup.object({
  password: yup.string().required("Please enter your password"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match"),
});

const ChangePassword: React.FC<Props> = ({ setMenu, email }) => {
  const navigate = useNavigate();
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
      password: "",
      passwordConfirmation: "",
    },
    resolver: yupResolver(schema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });
  // Handlers
  const onSubmit = async (input: {
    password: string;
    passwordConfirmation: string;
  }) => {
    try {
      const { password } = input;
      setIsLoading(true);
      const {
        data: { message },
      } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/resetPassword`,
        {
          newPassword: password,
          email,
        }
      );
      setSuccess(message);
      setError("");
      setIsLoading(false);
      const timeoutID = setTimeout(() => {
        navigate("/");
      }, 2000);
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
        Change password
      </p>
      <div className="flex flex-col gap-2 border-b border-solid border-gray-200 p-3">
        <p className="text-sm text-gray-700">Pick a strong password</p>
        <div className="flex flex-col items-center">
          <div className="flex-1 w-full max-w-[90%]">
            <TextInput
              type="password"
              placeholder="New password"
              name="password"
              control={control}
              errorPosition={isNotLargeScreen ? "bottom" : "left"}
              errorMessage={errors.password?.message || error || ""}
            />
          </div>
          <div className="flex-1 w-full max-w-[90%]">
            <TextInput
              type="password"
              placeholder="Confirm new password"
              name="passwordConfirmation"
              control={control}
              errorPosition={isNotLargeScreen ? "bottom" : "left"}
              errorMessage={errors.passwordConfirmation?.message || error || ""}
            />
          </div>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        {success && <p className="text-sm text-green-600">{success}</p>}
      </div>
      <div className="p-4 flex justify-end gap-3">
        <button
          type="button"
          className="bg-gray-200 hover:bg-gray-300 active:bg-gray-400 py-1 px-3 rounded-md"
          onClick={() => {
            setMenu("search");
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-800 active:bg-blue-900 py-1 px-3 rounded-md text-white"
        >
          Continue
        </button>
      </div>
    </form>
  );
};

export default ChangePassword;
