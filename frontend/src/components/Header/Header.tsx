import { useEffect, useRef, useState } from "react";
import headerStyles from "./style.module.css";
import React from "react";
import {
  Gaming,
  Home,
  HomeActive,
  Logo,
  Market,
  MarketActive,
  Search,
  Watch,
  WatchActive,
  Groups,
  GroupsActive,
  GamingActive,
  Menu,
  Messenger,
  Notifications,
  More,
  MoreActive,
} from "@svg/index";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@store/selectors/user";
import useOnClickOutside from "@hooks/useOnClickOutside";
import { useMediaQuery } from "react-responsive";
// Components
import ToolTip from "@/components/ToolTip";
import SearchMenu from "@components/Header/SearchMenu";
import AllMenu from "@components/Header/AllMenu";
import AccountMenu from "@components/Header/AccountMenu";

type Props = {};

const Header: React.FC<Props> = (props: Props) => {
  const user = useSelector(selectCurrentUser);
  // Screen
  const isBelowLarge = useMediaQuery({ query: "(max-width: 1260px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1100px)" });
  const isSmallScreen = useMediaQuery({ query: "(max-width: 640px)" });
  // States, href
  const searchRef = useRef(null);
  const allMenuRef = useRef(null);
  const messengerRef = useRef(null);
  const notificationsRef = useRef(null);
  const accountRef = useRef(null);
  const [currentMenu, setCurrentMenu] = useState("");
  // Use click outside
  useOnClickOutside(searchRef, () => {
    if (currentMenu === "search") {
      setCurrentMenu("");
    }
  });
  useOnClickOutside(allMenuRef, () => {
    if (currentMenu === "menu") {
      setCurrentMenu("");
    }
  });
  useOnClickOutside(messengerRef, () => {
    if (currentMenu === "messenger") {
      setCurrentMenu("");
    }
  });
  useOnClickOutside(notificationsRef, () => {
    if (currentMenu === "notifications") {
      setCurrentMenu("");
    }
  });
  useOnClickOutside(accountRef, () => {
    if (currentMenu === "account") {
      setCurrentMenu("");
    }
  });

  return (
    <header className="fixed w-full top-0 left-0 px-4 py-1 flex justify-between shadow-md bg-white">
      {/* left */}
      <div className={`${headerStyles["header-left"]}`} ref={searchRef}>
        <Link to="/">
          <Logo />
        </Link>
        <div
          className={`cursor-pointer rounded-full flex justify-center items-center bg-[var(--bg-secondary)] fixed top-[8px] transition-all duration-150 delay-100 ease-linear z-40 ${
            currentMenu === "search" ? "left-[52px] w-[252px]" : "left-[64px]"
          }`}
        >
          {!(currentMenu === "search") && (
            <div
              className={`p-3`}
              onClick={() => {
                setCurrentMenu("search");
              }}
            >
              <Search />
            </div>
          )}
          {(!isBelowLarge || (isBelowLarge && currentMenu === "search")) && (
            <input
              type="text"
              className={`w-[200px] p-2 border-none outline-none bg-transparent -translate-x-3 transition-all duration-300 ease-linear placeholder:text-[var(--color-secondary)] tracking-wide font-[300]`}
              placeholder="Search Facebook"
              onFocus={() => {
                setCurrentMenu("search");
              }}
            />
          )}
        </div>
        {currentMenu === "search" && (
          <SearchMenu
            setHideMenu={() => {
              setCurrentMenu("");
            }}
          />
        )}
      </div>
      {/* middle */}
      <div
        className={`${headerStyles["header-middle"]} translate-x-[58.5px]`}
        style={
          isTabletOrMobile
            ? {
                maxWidth: "435px",
                marginLeft: "auto",
                marginRight: "100px",
              }
            : {}
        }
      >
        {!isSmallScreen && (
          <ToolTip title="Home">
            <NavLink
              to="/"
              className={({ isActive }) => {
                return isActive
                  ? `${
                      headerStyles["header-nav-item"] +
                      " " +
                      headerStyles["active"]
                    }`
                  : `${headerStyles["header-nav-item"]}`;
              }}
            >
              {({ isActive }) => {
                return isActive ? (
                  <>
                    <HomeActive />
                    {true && <div className={headerStyles["number"]}>9</div>}
                  </>
                ) : (
                  <>
                    <Home />;
                    {true && <div className={headerStyles["number"]}>9</div>}
                  </>
                );
              }}
            </NavLink>
          </ToolTip>
        )}
        {!isSmallScreen && (
          <ToolTip title="Watch">
            <NavLink
              to="/watch"
              className={({ isActive }) => {
                return isActive
                  ? `${
                      headerStyles["header-nav-item"] +
                      " " +
                      headerStyles["active"]
                    }`
                  : `${headerStyles["header-nav-item"]}`;
              }}
            >
              {({ isActive }) => {
                return isActive ? (
                  <>
                    <WatchActive />
                    {false && <div className={headerStyles["number"]}>9</div>}
                  </>
                ) : (
                  <>
                    <Watch />
                    {false && <div className={headerStyles["number"]}>9</div>}
                  </>
                );
              }}
            </NavLink>
          </ToolTip>
        )}
        {!isSmallScreen && (
          <ToolTip title="Market">
            <NavLink
              to="/market"
              className={({ isActive }) => {
                return isActive
                  ? `${
                      headerStyles["header-nav-item"] +
                      " " +
                      headerStyles["active"]
                    }`
                  : `${headerStyles["header-nav-item"]}`;
              }}
            >
              {({ isActive }) => {
                return isActive ? (
                  <>
                    <MarketActive />
                    {false && <div className={headerStyles["number"]}>9</div>}
                  </>
                ) : (
                  <>
                    <Market />
                    {false && <div className={headerStyles["number"]}>9</div>}
                  </>
                );
              }}
            </NavLink>
          </ToolTip>
        )}
        {!isSmallScreen && (
          <ToolTip title="Groups">
            <NavLink
              to="/groups"
              className={({ isActive }) => {
                return isActive
                  ? `${
                      headerStyles["header-nav-item"] +
                      " " +
                      headerStyles["active"]
                    }`
                  : `${headerStyles["header-nav-item"]}`;
              }}
            >
              {({ isActive }) => {
                return isActive ? (
                  <>
                    <GroupsActive />
                    {false && <div className={headerStyles["number"]}>9</div>}
                  </>
                ) : (
                  <>
                    <Groups />
                    {false && <div className={headerStyles["number"]}>9</div>}
                  </>
                );
              }}
            </NavLink>
          </ToolTip>
        )}
        {!isTabletOrMobile && (
          <ToolTip title="Gaming">
            <NavLink
              to="/gaming"
              className={({ isActive }) => {
                return isActive
                  ? `${
                      headerStyles["header-nav-item"] +
                      " " +
                      headerStyles["active"]
                    }`
                  : `${headerStyles["header-nav-item"]}`;
              }}
            >
              {({ isActive }) => {
                return isActive ? (
                  <>
                    <GamingActive />
                    {false && <div className={headerStyles["number"]}>9</div>}
                  </>
                ) : (
                  <>
                    <Gaming />
                    {false && <div className={headerStyles["number"]}>9</div>}
                  </>
                );
              }}
            </NavLink>
          </ToolTip>
        )}
        {isTabletOrMobile && (
          <ToolTip title="More">
            <NavLink
              to="/bookmarks"
              className={({ isActive }) => {
                return isActive
                  ? `${
                      headerStyles["header-nav-item"] +
                      " " +
                      headerStyles["active"]
                    }`
                  : `${headerStyles["header-nav-item"]}`;
              }}
              style={
                isSmallScreen
                  ? {
                      flex: "0",
                      paddingLeft: "12px",
                      paddingRight: "12px",
                    }
                  : {}
              }
            >
              {({ isActive }) => {
                return isActive ? (
                  <>
                    <MoreActive />
                    {false && <div className={headerStyles["number"]}>9</div>}
                  </>
                ) : (
                  <>
                    <More />
                    {false && <div className={headerStyles["number"]}>9</div>}
                  </>
                );
              }}
            </NavLink>
          </ToolTip>
        )}
      </div>
      {/* right */}
      <div className={headerStyles["header-right"]}>
        <div ref={allMenuRef}>
          <ToolTip title="Menu">
            <button
              className="relative w-[40px] h-[40px] rounded-full bg-gray-200 hover:bg-gray-300 flex justify-center items-center"
              style={
                currentMenu === "menu"
                  ? {
                      background: "#E7F3FF",
                      color: "#1876F2",
                    }
                  : {}
              }
              onClick={() => {
                if (currentMenu === "menu") {
                  setCurrentMenu("");
                } else {
                  setCurrentMenu("menu");
                }
              }}
            >
              <>
                <Menu />
                {false && <div className={headerStyles["number"]}>9</div>}
              </>
            </button>
          </ToolTip>
          {currentMenu === "menu" && <AllMenu />}
        </div>
        <ToolTip title="Messenger">
          <button
            className="relative w-[40px] h-[40px] rounded-full bg-gray-200 hover:bg-gray-300 flex justify-center items-center"
            style={
              currentMenu === "messenger"
                ? {
                    background: "#E7F3FF",
                    color: "#1876F2",
                  }
                : {}
            }
            onClick={() => {
              if (currentMenu === "messenger") {
                setCurrentMenu("");
              } else {
                setCurrentMenu("messenger");
              }
            }}
            ref={messengerRef}
          >
            <>
              <Messenger />
              {true && (
                <div
                  className={headerStyles["number"]}
                  style={{ top: -5, right: -5 }}
                >
                  9
                </div>
              )}
            </>
          </button>
        </ToolTip>
        <ToolTip title="Notifications">
          <button
            className="relative w-[40px] h-[40px] rounded-full bg-gray-200 hover:bg-gray-300 flex justify-center items-center"
            style={
              currentMenu === "notifications"
                ? {
                    background: "#E7F3FF",
                    color: "#1876F2",
                  }
                : {}
            }
            onClick={() => {
              if (currentMenu === "notifications") {
                setCurrentMenu("");
              } else {
                setCurrentMenu("notifications");
              }
            }}
            ref={notificationsRef}
          >
            <Notifications />
          </button>
        </ToolTip>
        <div ref={accountRef}>
          <ToolTip title="Account">
            <button
              className={`relative w-[40px] h-[40px] rounded-full bg-white border border-solid border-gray-200 flex justify-center items-center overflow-hidden ${headerStyles["avatar"]}`}
              onClick={() => {
                if (currentMenu === "account") {
                  setCurrentMenu("");
                } else {
                  setCurrentMenu("account");
                }
              }}
            >
              <img src={user?.picture} alt="" />
            </button>
          </ToolTip>
          {currentMenu === "account" && <AccountMenu />}
        </div>
      </div>
    </header>
  );
};

export default Header;
