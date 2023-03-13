import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMediaQuery } from "react-responsive";
import { useForm } from "react-hook-form";
import TextInput from "@/components/TextInput";
import axios from "axios";

type Props = {
  setMenu: React.Dispatch<React.SetStateAction<string>>;
  email: string;
};

const schema = yup.object({
  code: yup
    .string()
    .required("Please enter the code sent to your email")
    .matches(/^([0-9]){4}$/, "A valid code is a 4-digit sequence"),
});

const CodeForm: React.FC<Props> = ({ setMenu, email }) => {
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
      code: "",
    },
    resolver: yupResolver(schema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });
  // Handlers
  const onSubmit = async (input: { code: string }) => {
    try {
      const { code } = input;
      if (code && email) {
        setIsLoading(true);
        const {
          data: { message },
        } = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/user/validateCode`,
          {
            email,
            code,
          }
        );
        //  Change to change password form
        setSuccess(message);
        setError("");
        setIsLoading(false);
        setMenu("resetPassword");
      }
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
        Code verification
      </p>
      <div className="flex flex-col gap-2 border-b border-solid border-gray-200 p-3">
        <p className="text-sm text-gray-700">
          Please enter code that been sent to your email
        </p>
        <div className="flex justify-center">
          <div className="flex-1 max-w-[75%]">
            <TextInput
              type="text"
              placeholder="Code"
              name="code"
              control={control}
              errorPosition={isNotLargeScreen ? "bottom" : "left"}
              errorMessage={errors.code?.message || error || ""}
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            {success && <p className="text-sm text-green-600">{success}</p>}
          </div>
        </div>
      </div>
      <div className="p-4 flex justify-end gap-3">
        <button
          type="button"
          className="bg-gray-200 hover:bg-gray-300 active:bg-gray-400 py-1 px-3 rounded-md"
          onClick={() => {
            setMenu("confirm");
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

export default CodeForm;
