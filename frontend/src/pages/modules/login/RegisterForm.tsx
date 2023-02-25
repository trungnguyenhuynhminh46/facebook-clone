import React, { useEffect, useState } from "react";
import { pronouns } from "../../../data/pronoun";
import { useForm } from "react-hook-form";
import { useMediaQuery } from "react-responsive";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import RegisterTextInput from "./RegisterTextInput";
import HeaderHelper from "./HeaderHelper";
import RegisterDropDown from "./RegisterDropDown";
import RegisterCheckbox from "./RegisterCheckbox";
import DateSelector from "./DateSelector";
import GenderSelector from "./GenderSelector";

type Props = {};

const schema = yup.object({
  first_name: yup
    .string()
    .required("What's your First name ?")
    .min(2, "Fisrt name must be between 2 and 16 characters.")
    .max(16, "Fisrt name must be between 2 and 16 characters.")
    .matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed."),
  last_name: yup
    .string()
    .required("What's your Last name ?")
    .min(2, "Last name must be between 2 and 16 characters.")
    .max(16, "Last name must be between 2 and 16 characters.")
    .matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed."),
  email: yup
    .string()
    .required(
      "You'll need this when you log in and if you ever need to reset your password."
    )
    .email("Enter a valid email address."),
  password: yup
    .string()
    .required(
      "Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &)."
    )
    .min(6, "Password must be atleast 6 characters.")
    .max(36, "Password can't be more than 36 characters"),
  gender: yup
    .string()
    .required("Please choose a gender. You can change who can see this later."),
  pronoun: yup.string().when("gender", {
    is: "custom",
    then: (schema) => schema.required("Please select your pronoun"),
  }),
});

const RegisterForm: React.FC<Props> = () => {
  const isNotLargeScreen = useMediaQuery({
    query: "(max-width: 1024px)",
  });
  // States, variables
  const [birthDayError, setBirthDayError] = useState("");
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "unset";
    };
  }, []);
  // React hook form
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      bYear: new Date().getFullYear(),
      bMonth: new Date().getMonth() + 1,
      bDay: new Date().getDate(),
      gender: "",
      pronoun: "",
      optional_gender: "",
    },
    resolver: yupResolver(schema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });
  const watchGender = watch("gender");
  const watchBDay = watch("bDay");
  const watchBMonth = watch("bMonth");
  const watchBYear = watch("bYear");
  // console.log(errors);
  const onSubmit = (data: any) => {
    console.log(data);
    console.log(birthDayError);
  };
  const validateBirthDay = () => {
    const picked_date = new Date(watchBYear, watchBMonth - 1, watchBDay);
    const ageDifMs = Date.now() - picked_date.getTime();
    const ageDate = new Date(ageDifMs);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);
    if (age < 14) {
      setBirthDayError(
        "It looks like you've enetered the wrong info.Please make sure that you use your real date of birth."
      );
    } else if (age > 200) {
      setBirthDayError(
        "It looks like you've enetered the wrong info.Please make sure that you use your real date of birth."
      );
    } else {
      setBirthDayError("");
    }
  };
  return (
    <div className="fixed inset-0 bg-[var(--overlay-white)] z-40 flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="w-[432px] m-5 text-left rounded-lg bg-white shadow-lg relative"
      >
        <i className="exit_icon absolute top-4 right-4 cursor-pointer"></i>
        <div className="py-[10px] px-[16px] border-b border-solid border-b-[#dadde1]">
          <h1 className="text-[#1c1e21] text-[32px] leading-[38px] font-bold">
            Sign Up
          </h1>
          <h4 className="text-[15px] leading-6 text-[#606770]">
            It's quick and easy
          </h4>
        </div>
        <div className="p-4 w-full">
          <div className="grid grid-cols-1 gap-3">
            <div className="grid grid-cols-2 gap-3">
              <RegisterTextInput
                type="text"
                placeholder="Firstname"
                name="first_name"
                control={control}
                errorMessage={errors.first_name?.message}
                errorPosition={isNotLargeScreen ? "bottom" : "left"}
              />
              <RegisterTextInput
                type="text"
                placeholder="Surname"
                name="last_name"
                control={control}
                errorMessage={errors.last_name?.message}
                errorPosition="bottom"
              />
            </div>
            <RegisterTextInput
              type="text"
              placeholder="Mobile number or email address"
              name="email"
              control={control}
              errorMessage={errors.email?.message}
              errorPosition={isNotLargeScreen ? "bottom" : "left"}
            />
            <RegisterTextInput
              type="password"
              placeholder="New password"
              name="password"
              control={control}
              errorMessage={errors.password?.message}
              errorPosition={isNotLargeScreen ? "bottom" : "left"}
            />
            <DateSelector
              dayName="bDay"
              monthName="bMonth"
              yearName="bYear"
              control={control}
              errorPosition={isNotLargeScreen ? "bottom" : "left"}
              errorMessage={birthDayError}
              setBirthDayError={setBirthDayError}
            />
            <GenderSelector
              control={control}
              errorPosition={isNotLargeScreen ? "bottom" : "left"}
              errorMessage={errors.gender?.message}
            />
            {watchGender === "custom" && (
              <div className="w-full">
                <RegisterDropDown
                  items={pronouns}
                  defaultOption="Select your pronoun"
                  name="pronoun"
                  control={control}
                  errorPosition={isNotLargeScreen ? "top" : "left"}
                  errorMessage={errors.pronoun?.message}
                />
                <p className="text-[#65676b] text-[13px] leading-[24px] mb-1">
                  Your pronoun is visible to everyone
                </p>
                <RegisterTextInput
                  type="text"
                  placeholder="Gender (optional)"
                  name="optional_gender"
                  control={control}
                  errorMessage=""
                  errorPosition={isNotLargeScreen ? "bottom" : "left"}
                />
              </div>
            )}
            <p className="text-[#65676b] text-[13px] leading-[16px]">
              People who use our service may have uploaded your contact
              information to Facebook.{" "}
              <a href="#" className="text-[#385898]">
                Learn more
              </a>
              .
            </p>
            <p className="text-[#65676b] text-[13px] leading-[16px]">
              By clicking Sign Up, you agree to our{" "}
              <a href="#" className="text-[#385898]">
                Terms, Privacy Policy and Cookies Policy
              </a>
              . You may receive SMS notifications from us and can opt out at any
              time.
            </p>
            <div className="flex justify-center">
              <button
                className="bg-[#00a400] text-white rounded-[6px] text-[18px] w-[194px] h-[36px] px-[32px] font-bold tracking-wide my-[10px]"
                onClick={validateBirthDay}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
