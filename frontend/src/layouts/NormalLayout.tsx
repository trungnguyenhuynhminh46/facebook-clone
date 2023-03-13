import React, { useState } from "react";
import Style from "./style.module.css";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slices/user";
import Cookies from "js-cookie";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react/headless";
import { ArrowDown } from "@/svg";

type Props = {
  children: React.ReactNode;
};

const NormalLayout = (props: Props) => {
  const [isShown, setIsShown] = useState(false);
  const dispatch = useDispatch();
  return (
    <div className="bg-[var(--bg-secondary)]">
      <header className="fixed w-full top-0 left-0 py-2 px-4 shadow-md bg-[var(--blue-color)] z-10">
        <div className="container flex justify-between">
          <Link to="/">
            <img src="/icons/facebook_white.png" alt="" className="w-9 h-9" />
          </Link>
          <Tippy
            visible={isShown}
            placement="bottom-end"
            interactive={true}
            offset={[0, 10]}
            delay={300}
            render={(attrs) => (
              <div className={Style["tool-tip"]} {...attrs}>
                <div
                  className="relative z-10 cursor-pointer w-full px-2 text-sm text-[#65676b] bg-white transition-all duration-200 ease-linear hover:bg-gray-200 text-center"
                  onClick={() => {
                    dispatch(logout());
                    Cookies.set("user", "");
                  }}
                >
                  Logout
                </div>
              </div>
            )}
          >
            <button
              onClick={() => {
                setIsShown(!isShown);
              }}
            >
              <ArrowDown color="white" />
            </button>
          </Tippy>
        </div>
      </header>
      {props.children}
      <Footer></Footer>
    </div>
  );
};

export default NormalLayout;
