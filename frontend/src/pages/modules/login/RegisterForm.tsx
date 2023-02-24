import React, { useEffect } from "react";
import RegisterTextInput from "./RegisterTextInput";
import HeaderHelper from "./HeaderHelper";

type Props = {};

const RegisterForm: React.FC<Props> = () => {
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "unset";
    };
  }, []);
  return (
    <div className="fixed inset-0 bg-[var(--overlay-white)] z-40 flex justify-center items-center">
      <form
        action=""
        className="w-[432px] m-5 text-left rounded-lg bg-white shadow-lg"
      >
        <div className="py-[10px] px-[16px] border-b border-solid border-b-[#dadde1]">
          <h1>Sign Up</h1>
          <h4>It's quick and easy</h4>
        </div>
        <div className="p-4 w-full">
          <div className="grid grid-cols-1 gap-3">
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                className="p-[11px] bg-[#f5f6f7] border border-solid border-[#ccd0d5] rounded-[5px] text-[15px] leading-[16px] text-[#1c1e21]"
                placeholder="Firstname"
              />
              <input
                type="text"
                className="p-[11px] bg-[#f5f6f7] border border-solid border-[#ccd0d5] rounded-[5px] text-[15px] leading-[16px] text-[#1c1e21]"
                placeholder="Surname"
              />
            </div>
            <input
              type="text"
              className="p-[11px] bg-[#f5f6f7] border border-solid border-[#ccd0d5] rounded-[5px] text-[15px] leading-[16px] text-[#1c1e21]"
              placeholder="Mobile number or email address"
            />
            <input
              type="text"
              className="p-[11px] bg-[#f5f6f7] border border-solid border-[#ccd0d5] rounded-[5px] text-[15px] leading-[16px] text-[#1c1e21]"
              placeholder="New password"
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
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
