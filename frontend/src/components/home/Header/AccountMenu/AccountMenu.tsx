import "./animation.css";
import React, { useEffect, useRef, useState } from "react";
import { selectCurrentUser } from "@store/selectors/user";
import { useSelector } from "react-redux";
import useVisualViewportHeight from "@/hooks/useVisualViewportHeight";
// Components
import MainMenu from "./MainMenu";
import SettingsMenu from "./SettingsMenu";
import HelpMenu from "./HelpMenu";
import DisplayMenu from "./DisplayMenu";

type Props = {};

const AccountMenu: React.FC<Props> = () => {
  // Refs
  const visualViewportHeight = useVisualViewportHeight();
  const menu0 = useRef<HTMLDivElement>(null);
  const menu1 = useRef<HTMLDivElement>(null);
  const menu2 = useRef<HTMLDivElement>(null);
  const menu3 = useRef<HTMLDivElement>(null);

  const currentUser = useSelector(selectCurrentUser);
  const [menu, setMenu] = useState(0);
  const [menuHeight, setMenuHeight] = useState(0);
  useEffect(() => {
    console.log(window.innerHeight);
  }, [window.innerHeight]);
  return (
    <div
      className="fixed top-[52px] right-4 rounded-lg bg-white w-[360px] pt-3 px-2 shadow3 overflow-hidden transition-all duration-200 ease-linear overflow-y-scroll"
      style={
        menuHeight > 0
          ? {
              height: menuHeight,
              maxHeight: visualViewportHeight
                ? visualViewportHeight - 70
                : "none",
            }
          : {
              height: 408,
              maxHeight: visualViewportHeight
                ? visualViewportHeight - 70
                : "none",
            }
      }
    >
      <MainMenu
        menu={menu}
        menuRef={menu0}
        onEnter={() => {
          menu0.current?.offsetHeight &&
            setMenuHeight(menu0.current?.offsetHeight + 12);
        }}
        currentUser={currentUser}
        setMenu={setMenu}
      />
      <SettingsMenu
        menu={menu}
        menuRef={menu1}
        setMenu={setMenu}
        onEnter={() => {
          menu1.current?.offsetHeight &&
            setMenuHeight(menu1.current?.offsetHeight + 20);
        }}
      />
      <HelpMenu
        menu={menu}
        menuRef={menu2}
        setMenu={setMenu}
        onEnter={() => {
          menu2.current?.offsetHeight &&
            setMenuHeight(menu2.current?.offsetHeight + 20);
        }}
      />
      <DisplayMenu
        menu={menu}
        menuRef={menu3}
        setMenu={setMenu}
        onEnter={() => {
          menu3.current?.offsetHeight &&
            setMenuHeight(menu3.current?.offsetHeight + 20);
        }}
      />
    </div>
  );
};

export default AccountMenu;
