import React from "react";
import { CSSTransition } from "react-transition-group";
import { Return } from "@/svg";
import MenuItem from "./MenuItem";

type Props = {
  menu: number;
  menuRef: any;
  onEnter?: () => void;
  setMenu: (menu: number) => void;
};

const DisplayMenu: React.FC<Props> = ({ menu, menuRef, onEnter, setMenu }) => {
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
            className="cursor-pointer w-9 h-9 rounded-full hover:bg-gray-100 flex justify-center items-center"
            onClick={() => {
              setMenu(0);
            }}
          >
            <Return />
          </div>
          <h2 className="text-2xl font-bold leading-7 pl-[10px]">
            Display & accessibility
          </h2>
        </div>
        {/* End top */}
        {/* Dark mode */}
        <div className="w-full mb-2">
          <div className="flex px-2">
            <div>
              <div className="w-9 h-9 bg-gray-200 rounded-full flex justify-center items-center">
                <i className="dark_filled_icon"></i>
              </div>
            </div>
            <div className="flex flex-col">
              <h4 className="font-semibold text-[17px] text-[var(--color-primary)] ml-3">
                Dark Mode
              </h4>
              <p className="text-[15px] text-[var(--color-secondary)] ml-3 mb-1">
                Adjust the appearance of Facebook to reduce glare and give your
                eyes a break.
              </p>
              <div className="flex items-center py-3 px-2 rounded-lg cursor-pointer transition-all duration-100 ease-linear hover:bg-gray-100">
                <span className="text-[15px] text-[var(--color-primary)] font-semibold">
                  Off
                </span>
                <input
                  type="radio"
                  name="dark"
                  id="dark-off"
                  className="ml-auto w-5 h-5"
                />
              </div>
              <div className="flex items-center py-3 px-2 rounded-lg cursor-pointer transition-all duration-100 ease-linear hover:bg-gray-100">
                <span className="text-[15px] text-[var(--color-primary)] font-semibold">
                  On
                </span>
                <input
                  type="radio"
                  name="dark"
                  id="dark-on"
                  className="ml-auto w-5 h-5"
                />
              </div>
              <div className="flex items-center py-3 px-2 rounded-lg cursor-pointer transition-all duration-100 ease-linear hover:bg-gray-100">
                <div className="flex flex-col">
                  <span className="text-[15px] text-[var(--color-primary)] font-semibold">
                    Automatic
                  </span>
                  <p className="text-[12px] text-[var(--color-secondary)]">
                    We’ll automatically adjust the display based on your
                    device’s system settings.
                  </p>
                </div>
                <input
                  type="radio"
                  name="dark"
                  id="dark-auto"
                  className="ml-auto w-5 h-5 flex-shrink-0"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Compact mode */}
        <div className="w-full mb-2">
          <div className="flex px-2">
            <div>
              <div className="w-9 h-9 bg-gray-200 rounded-full flex justify-center items-center">
                <i className="compact_icon"></i>
              </div>
            </div>
            <div className="flex flex-col">
              <h4 className="font-semibold text-[17px] text-[var(--color-primary)] ml-3">
                Compact Mode
              </h4>
              <p className="text-[15px] text-[var(--color-secondary)] ml-3 mb-1">
                Make your font size smaller so more content can fit on the
                screen.
              </p>
              <div className="flex items-center py-3 px-2 rounded-lg cursor-pointer transition-all duration-100 ease-linear hover:bg-gray-100">
                <span className="text-[15px] text-[var(--color-primary)] font-semibold">
                  Off
                </span>
                <input
                  type="radio"
                  name="compact"
                  id="compact-off"
                  className="ml-auto w-5 h-5"
                />
              </div>
              <div className="flex items-center py-3 px-2 rounded-lg cursor-pointer transition-all duration-100 ease-linear hover:bg-gray-100">
                <span className="text-[15px] text-[var(--color-primary)] font-semibold">
                  On
                </span>
                <input
                  type="radio"
                  name="compact"
                  id="compact-on"
                  className="ml-auto w-5 h-5"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Show previews of links */}
        <div className="w-full mb-2">
          <div className="flex px-2">
            <div>
              <div className="w-9 h-9 bg-gray-200 rounded-full flex justify-center items-center">
                <i className="preview_icon"></i>
              </div>
            </div>
            <div className="flex flex-col">
              <h4 className="font-semibold text-[17px] text-[var(--color-primary)] ml-3">
                Show previews of links
              </h4>
              <p className="text-[15px] text-[var(--color-secondary)] ml-3 mb-1">
                Without opening a page to a person, event, or group, show info
                and actions in a preview window.
              </p>
              <div className="flex items-center py-3 px-2 rounded-lg cursor-pointer transition-all duration-100 ease-linear hover:bg-gray-100">
                <span className="text-[15px] text-[var(--color-primary)] font-semibold">
                  Show preview when hovering pointer over link
                </span>
                <input
                  type="radio"
                  name="preview"
                  id="preview-hover"
                  className="ml-auto w-5 h-5 flex-shrink-0"
                />
              </div>
              <div className="flex items-center py-3 px-2 rounded-lg cursor-pointer transition-all duration-100 ease-linear hover:bg-gray-100">
                <div className="flex flex-col">
                  <span className="text-[15px] text-[var(--color-primary)] font-semibold">
                    Show preview after clicking
                  </span>
                  <p className="text-[12px] text-[var(--color-secondary)]">
                    Best when using a screen reader or magnifier. Links change
                    to buttons that open preview windows.
                  </p>
                </div>
                <input
                  type="radio"
                  name="preview"
                  id="preview-click"
                  className="ml-auto w-5 h-5 flex-shrink-0"
                />
              </div>
              <div className="flex items-center py-3 px-2 rounded-lg cursor-pointer transition-all duration-100 ease-linear hover:bg-gray-100">
                <span className="text-[15px] text-[var(--color-primary)] font-semibold">
                  Dont't show preview
                </span>
                <input
                  type="radio"
                  name="preview"
                  id="preview-none"
                  className="ml-auto w-5 h-5"
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
