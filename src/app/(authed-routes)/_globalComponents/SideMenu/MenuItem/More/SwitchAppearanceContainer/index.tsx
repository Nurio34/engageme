import Chevron from "@/app/_globalComponents/Svg/Chevron";
import DarkThemeIcon from "@/app/_globalComponents/Svg/MoreSvgs/Theme/DarkThmeIcon";
import LightThemeIcon from "@/app/_globalComponents/Svg/MoreSvgs/Theme/LightThemeIcon";
import { useAnimatedMount } from "@/hooks/useAnimatedMount";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  toggleMoreModal,
  toggleSwitchAppearanceModal,
} from "@/store/slices/modals";
import { setTheme } from "@/store/slices/theme";
import { useEffect } from "react";

function SwitchAppearanceContainer() {
  const { isSwitchAppearanceModalOpen } = useAppSelector((s) => s.modals);
  const { currentTheme } = useAppSelector((s) => s.theme);

  const dispatch = useAppDispatch();

  const { isMounted, style } = useAnimatedMount(
    isSwitchAppearanceModalOpen,
    "translateY"
  );

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    if (!localTheme) dispatch(setTheme("light"));
    else {
      if (localTheme === "light") dispatch(setTheme("light"));
      else dispatch(setTheme("dark"));
    }
  }, []);

  useEffect(() => {
    const html = document.querySelector("html");
    if (html) {
      if (currentTheme === "dark") {
        html.dataset.theme = "dark";
        localStorage.setItem("theme", "dark");
      } else {
        html.dataset.theme = "light";
        localStorage.setItem("theme", "light");
      }
    }
  }, [currentTheme]);

  return (
    isMounted && (
      <>
        <div
          className="absolute z-20 w-64 bottom-16 bg-base-100 text-base-content shadow-[0px_2px_10px_-2px] rounded-lg transition-all duration-[400ms]"
          style={style}
        >
          <div className="flex items-center justify-between pr-5 font-semibold">
            <button
              type="button"
              className="px-5 py-5"
              onClick={() => {
                dispatch(toggleSwitchAppearanceModal());
                dispatch(toggleMoreModal());
              }}
            >
              <Chevron rotate={270} />
            </button>
            <span>Switch Appearance</span>
            {currentTheme === "dark" ? <DarkThemeIcon /> : <LightThemeIcon />}
          </div>
          <hr />
          <div className="p-2">
            <button
              className="w-full flex justify-between items-center p-4 rounded-lg transition-colors hover:bg-base-300"
              onClick={() =>
                dispatch(setTheme(currentTheme === "light" ? "dark" : "light"))
              }
            >
              <span className="text-sm">Dark Mode</span>
              <input
                type="checkbox"
                value="synthwave"
                className="toggle toggle-sm theme-controller"
                checked={currentTheme === "dark"}
                onChange={() => {}}
              />
            </button>
          </div>
        </div>
        <div
          className="w-screen h-screen fixed top-0 left-0"
          onClick={() => dispatch(toggleSwitchAppearanceModal())}
        />
      </>
    )
  );
}
export default SwitchAppearanceContainer;
