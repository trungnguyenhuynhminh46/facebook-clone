import React, { useEffect } from "react";
import { days, months, years } from "../../../data/date";
import { useForm } from "react-hook-form";
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
});

const RegisterForm: React.FC<Props> = () => {
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "unset";
    };
  }, []);
  // React hook form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      gender: "",
      bYear: new Date().getFullYear(),
      bMonth: new Date().getMonth() + 1,
      bDay: new Date().getDate(),
    },
    resolver: yupResolver(schema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });
  console.log(errors);
  const onSubmit = (data: any) => {
    console.log(data);
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
                errorPosition="left"
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
              errorPosition="left"
            />
            <RegisterTextInput
              type="password"
              placeholder="New password"
              name="password"
              control={control}
              errorMessage={errors.password?.message}
              errorPosition="left"
            />
            <div>
              <HeaderHelper title="Date of birth">
                <div className="text-[#65676b] text-[13px] leading-[16px]">
                  <b>Providing your birthday</b> helps make sure that you get
                  the right Facebook experience for your age. If you want to
                  change who sees this, go to the About section of your profile.
                  For more details, please visit our{" "}
                  <a className="text-[var(--blue-color)]" href="#">
                    Privacy Policy
                  </a>
                  .
                </div>
              </HeaderHelper>
              <DateSelector
                dayName="bDay"
                monthName="bMonth"
                yearName="bYear"
              />
            </div>
            <GenderSelector
              control={control}
              errorPosition="left"
              errorMessage={errors.gender?.message}
            />
            <div className="w-full">
              <RegisterDropDown
                items={days}
                name="pronoun"
                defaultOption="Select your pronoun"
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
                errorPosition="left"
              />
            </div>
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
              <button className="bg-[#00a400] text-white rounded-[6px] text-[18px] w-[194px] h-[36px] px-[32px] font-bold tracking-wide my-[10px]">
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
