import { useRef, useState } from "react";
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
} from "../../../svg";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../store/selectors/user";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
// Components
import ToolTip from "./ToolTip";
import SearchMenu from "./Menu/SearchMenu";
import AllMenu from "./Menu/AllMenu";

type Props = {};

const Header: React.FC<Props> = (props: Props) => {
  const user = useSelector(selectCurrentUser);
  // States, href
  const searchRef = useRef(null);
  const allMenuRef = useRef(null);
  const messengerRef = useRef(null);
  const notificationsRef = useRef(null);
  const accountRef = useRef(null);
  const [currentMenu, setCurrentMenu] = useState("");
  // Use click outside
  useOnClickOutside(searchRef, () => {
    if (currentMenu === "search") setCurrentMenu("");
  });
  useOnClickOutside(allMenuRef, () => {
    if (currentMenu === "menu") setCurrentMenu("");
  });
  useOnClickOutside(messengerRef, () => {
    if (currentMenu === "messenger") setCurrentMenu("");
  });
  useOnClickOutside(notificationsRef, () => {
    if (currentMenu === "notifications") setCurrentMenu("");
  });
  useOnClickOutside(accountRef, () => {
    if (currentMenu === "account") setCurrentMenu("");
  });

  return (
    <header className="fixed w-full top-0 left-0 px-4 py-1 flex justify-between shadow-md">
      {/* left */}
      <div className={`${headerStyles["header-left"]}`}>
        <Link to="/">
          <Logo />
        </Link>
        <div
          className={`cursor-pointer rounded-full flex justify-center items-center bg-[var(--bg-secondary)] fixed top-[8px] right-[1215px] transition-all duration-150 delay-100 ease-linear z-40 ${
            currentMenu === "search" ? "left-[52px]" : "left-[64px]"
          }`}
          ref={searchRef}
        >
          {!(currentMenu === "search") && (
            <div className={`p-3`}>
              <Search />
            </div>
          )}
          <input
            type="text"
            className={`w-[200px] p-2 border-none outline-none bg-transparent -translate-x-3 transition-all duration-300 ease-linear placeholder:text-[var(--color-secondary)] tracking-wide font-[300]`}
            placeholder="Search Facebook"
            onFocus={() => {
              setCurrentMenu("search");
            }}
          />
        </div>
      </div>
      {/* middle */}
      <div className={`${headerStyles["header-middle"]} translate-x-[58.5px]`}>
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
          {currentMenu === "menu" && (
            <AllMenu
              setHideMenu={() => {
                setCurrentMenu("");
              }}
            />
          )}
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
        <ToolTip title="Account">
          <button
            className={`relative w-[40px] h-[40px] rounded-full bg-white border border-solid border-gray-200 hover:bg-gray-100 flex justify-center items-center overflow-hidden ${headerStyles["avatar"]}`}
            onClick={() => {
              if (currentMenu === "account") {
                setCurrentMenu("");
              } else {
                setCurrentMenu("account");
              }
            }}
            ref={accountRef}
          >
            <img src={user?.picture} alt="" />
          </button>
        </ToolTip>
      </div>
      {currentMenu === "search" && (
        <SearchMenu
          setHideMenu={() => {
            setCurrentMenu("");
          }}
        />
      )}
    </header>
  );
};

export default Header;
