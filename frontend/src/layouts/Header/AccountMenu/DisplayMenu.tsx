import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { Return } from "@/svg";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/selectors/user";
import { useChangeDisplayModeMutation } from "@/store/api/usersApi";
import Cookies from "js-cookie";
import { updateDisplayMode } from "@/store/slices/user";

type Props = {
  menu: number;
  menuRef: any;
  onEnter?: () => void;
  setMenu: (menu: number) => void;
};

const DisplayMenu: React.FC<Props> = ({ menu, menuRef, onEnter, setMenu }) => {
  const dispatch = useDispatch();
  const [changeDisplayMode, { isLoading: isChangingDisplayMode }] =
    useChangeDisplayModeMutation();
  const currentUser = useSelector(selectCurrentUser);
  const [theme, setTheme] = useState<string>(currentUser.displayMode);
  useEffect(() => {
    // console.log("OK");
    (async () => {
      if (isChangingDisplayMode) {
        return;
      }
      try {
        // Update database
        const { newDisplayMode } = await changeDisplayMode({
          displayMode: theme,
        }).unwrap();
        // Update store, cookie
        Cookies.set(
          "user",
          JSON.stringify({
            ...currentUser,
            displayMode: newDisplayMode,
          })
        );
        dispatch(updateDisplayMode({ newDisplayMode }));
        // Change theme
        if (newDisplayMode === "light") {
          document.documentElement.classList.remove("dark");
        }
        if (newDisplayMode === "dark") {
          document.documentElement.classList.add("dark");
        }
        if (newDisplayMode === "auto") {
          if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
        }
      } catch (err: any) {
        console.log(err);
      }
    })();
  }, [theme]);

  return (
    <CSSTransition
      in={menu === 3}
      nodeRef={menuRef}
      classNames="menu-1"
      timeout={200}
      unmountOnExit
      onEnter={onEnter}
    >
      <div className="w-full" ref={menuRef}>
        <div className="flex items-center p-2 pt-1">
          <div
            className="cursor-pointer w-9 h-9 rounded-full relative hover--overlay overflow-hidden flex justify-center items-center"
            onClick={() => {
              setMenu(0);
            }}
          >
            <Return />
          </div>
          <h2 className="text-2xl font-bold leading-7 pl-[10px] dark:text-[#E7E9ED]">
            Display & accessibility
          </h2>
        </div>
        {/* End top */}
        {/* Dark mode */}
        <div className="w-full mb-2">
          <div className="flex px-2">
            <div>
              <div className="w-9 h-9 bg-gray-200 dark:bg-[#3A3B3C] rounded-full flex justify-center items-center">
                <i className="dark_filled_icon dark:invert"></i>
              </div>
            </div>
            <div className="flex flex-col">
              <h4 className="font-semibold text-[17px] text-[var(--color-primary)] dark:text-[#E7E9ED] ml-3">
                Dark Mode
              </h4>
              <p className="text-[15px] text-[var(--color-secondary)] dark:text-[#B0B3B8] ml-3 mb-1">
                Adjust the appearance of Facebook to reduce glare and give your
                eyes a break.
              </p>
              <div className="flex items-center py-3 px-2 rounded-lg cursor-pointer transition-all duration-100 ease-linear relative hover--overlay overflow-hidden">
                <span className="text-[15px] text-[var(--color-primary)] dark:text-[#E7E9ED] font-semibold">
                  Off
                </span>
                <input
                  type="radio"
                  name="dark"
                  id="dark-off"
                  checked={theme === "light"}
                  onChange={() => {
                    if (!isChangingDisplayMode) {
                      setTheme("light");
                    }
                  }}
                  className="z-[1] ml-auto w-5 h-5"
                />
              </div>
              <div className="flex items-center py-3 px-2 rounded-lg cursor-pointer transition-all duration-100 ease-linear relative hover--overlay overflow-hidden">
                <span className="text-[15px] text-[var(--color-primary)] dark:text-[#E7E9ED] font-semibold">
                  On
                </span>
                <input
                  type="radio"
                  name="dark"
                  id="dark-on"
                  checked={theme === "dark"}
                  onChange={() => {
                    if (!isChangingDisplayMode) {
                      setTheme("dark");
                    }
                  }}
                  className="z-[1] ml-auto w-5 h-5"
                />
              </div>
              <div className="flex items-center py-3 px-2 rounded-lg cursor-pointer transition-all duration-100 ease-linear relative hover--overlay overflow-hidden">
                <div className="flex flex-col">
                  <span className="text-[15px] text-[var(--color-primary)] dark:text-[#E7E9ED] font-semibold">
                    Automatic
                  </span>
                  <p className="text-[12px] text-[var(--color-secondary)] dark:text-[#B0B3B8]">
                    We’ll automatically adjust the display based on your
                    device’s system settings.
                  </p>
                </div>
                <input
                  type="radio"
                  name="dark"
                  id="dark-auto"
                  checked={theme === "auto"}
                  onChange={() => {
                    if (!isChangingDisplayMode) {
                      setTheme("auto");
                    }
                  }}
                  className="z-[1] ml-auto w-5 h-5 flex-shrink-0"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Compact mode */}
        <div className="w-full mb-2">
          <div className="flex px-2">
            <div>
              <div className="w-9 h-9 bg-gray-200 dark:bg-[#3A3B3C] rounded-full flex justify-center items-center">
                <i className="compact_icon dark:invert"></i>
              </div>
            </div>
            <div className="flex flex-col">
              <h4 className="font-semibold text-[17px] text-[var(--color-primary)] dark:text-[#E7E9ED] ml-3">
                Compact Mode
              </h4>
              <p className="text-[15px] text-[var(--color-secondary)] dark:text-[#B0B3B8] ml-3 mb-1">
                Make your font size smaller so more content can fit on the
                screen.
              </p>
              <div className="flex items-center py-3 px-2 rounded-lg cursor-pointer transition-all duration-100 ease-linear relative hover--overlay overflow-hidden">
                <span className="text-[15px] text-[var(--color-primary)] dark:text-[#E7E9ED] font-semibold">
                  Off
                </span>
                <input
                  type="radio"
                  name="compact"
                  id="compact-off"
                  className="z-[1] ml-auto w-5 h-5"
                />
              </div>
              <div className="flex items-center py-3 px-2 rounded-lg cursor-pointer transition-all duration-100 ease-linear relative hover--overlay overflow-hidden">
                <span className="text-[15px] text-[var(--color-primary)] dark:text-[#E7E9ED] font-semibold">
                  On
                </span>
                <input
                  type="radio"
                  name="compact"
                  id="compact-on"
                  className="z-[1] ml-auto w-5 h-5"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Show previews of links */}
        <div className="w-full mb-2">
          <div className="flex px-2">
            <div>
              <div className="w-9 h-9 bg-gray-200 dark:bg-[#3A3B3C] rounded-full flex justify-center items-center">
                <i className="preview_icon dark:invert"></i>
              </div>
            </div>
            <div className="flex flex-col">
              <h4 className="font-semibold text-[17px] text-[var(--color-primary)] dark:text-[#E7E9ED] ml-3">
                Show previews of links
              </h4>
              <p className="text-[15px] text-[var(--color-secondary)] dark:text-[#B0B3B8] ml-3 mb-1">
                Without opening a page to a person, event, or group, show info
                and actions in a preview window.
              </p>
              <div className="flex items-center py-3 px-2 rounded-lg cursor-pointer transition-all duration-100 ease-linear relative hover--overlay overflow-hidden">
                <span className="text-[15px] text-[var(--color-primary)] dark:text-[#E7E9ED] font-semibold">
                  Show preview when hovering pointer over link
                </span>
                <input
                  type="radio"
                  name="preview"
                  id="preview-hover"
                  className="z-[1] ml-auto w-5 h-5 flex-shrink-0"
                />
              </div>
              <div className="flex items-center py-3 px-2 rounded-lg cursor-pointer transition-all duration-100 ease-linear relative hover--overlay overflow-hidden">
                <div className="flex flex-col">
                  <span className="text-[15px] text-[var(--color-primary)] dark:text-[#E7E9ED] font-semibold">
                    Show preview after clicking
                  </span>
                  <p className="text-[12px] text-[var(--color-secondary)] dark:text-[#B0B3B8]">
                    Best when using a screen reader or magnifier. Links change
                    to buttons that open preview windows.
                  </p>
                </div>
                <input
                  type="radio"
                  name="preview"
                  id="preview-click"
                  className="z-[1] ml-auto w-5 h-5 flex-shrink-0"
                />
              </div>
              <div className="flex items-center py-3 px-2 rounded-lg cursor-pointer transition-all duration-100 ease-linear relative hover--overlay overflow-hidden">
                <span className="text-[15px] text-[var(--color-primary)] dark:text-[#E7E9ED] font-semibold">
                  Dont't show preview
                </span>
                <input
                  type="radio"
                  name="preview"
                  id="preview-none"
                  className="z-[1] ml-auto w-5 h-5"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default DisplayMenu;
