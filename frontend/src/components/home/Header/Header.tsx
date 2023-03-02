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
// Components
import ToolTip from "./ToolTip";
import SearchMenu from "../SearchMenu";

type Props = {};

const Header: React.FC<Props> = (props: Props) => {
  const user = useSelector(selectCurrentUser);
  // States, href
  const [currentMenu, setCurrentMenu] = useState("");

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
        {currentMenu === "search" && (
          <SearchMenu
            setHideMenu={() => {
              setCurrentMenu("");
            }}
          />
        )}
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
              return isActive ? <HomeActive /> : <Home />;
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
              return isActive ? <WatchActive /> : <Watch />;
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
              return isActive ? <MarketActive /> : <Market />;
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
              return isActive ? <GroupsActive /> : <Groups />;
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
              return isActive ? <GamingActive /> : <Gaming />;
            }}
          </NavLink>
        </ToolTip>
      </div>
      {/* right */}
      <div className={headerStyles["header-right"]}>
        <ToolTip title="Menu">
          <button className="w-[40px] h-[40px] rounded-full bg-gray-200 hover:bg-gray-300 flex justify-center items-center">
            <Menu />
          </button>
        </ToolTip>
        <ToolTip title="Messenger">
          <button className="w-[40px] h-[40px] rounded-full bg-gray-200 hover:bg-gray-300 flex justify-center items-center">
            <Messenger />
          </button>
        </ToolTip>
        <ToolTip title="Notifications">
          <button className="w-[40px] h-[40px] rounded-full bg-gray-200 hover:bg-gray-300 flex justify-center items-center">
            <Notifications />
          </button>
        </ToolTip>
        <ToolTip title="Account">
          <button
            className={`w-[40px] h-[40px] rounded-full bg-white border border-solid border-gray-200 hover:bg-gray-100 flex justify-center items-center overflow-hidden ${headerStyles["avatar"]}`}
          >
            <img src={user?.picture} alt="" />
          </button>
        </ToolTip>
      </div>
    </header>
  );
};

export default Header;
