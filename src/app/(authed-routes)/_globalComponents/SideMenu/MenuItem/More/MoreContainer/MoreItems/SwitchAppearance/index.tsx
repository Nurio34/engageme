import {
  Dark,
  Light,
} from "@/app/_globalComponents/Svg/MoreSvgs/Theme/ThemeIcon";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  toggleMoreModal,
  toggleSwitchAppearanceModal,
} from "@/store/slices/modals";

function SwitchAppearance() {
  const { currentTheme } = useAppSelector((s) => s.theme);
  const isDarkTheme = currentTheme === "dark";

  const dispatch = useAppDispatch();

  return (
    <button
      type="button"
      className={`w-full flex gap-x-2 items-center min-w-max text-sm py-4 px-3 rounded-lg transition-colors 
        hover:bg-base-300
        `}
      onClick={() => {
        dispatch(toggleMoreModal());
        dispatch(toggleSwitchAppearanceModal());
      }}
    >
      {isDarkTheme ? <Dark /> : <Light />}
      Switch Appearance
    </button>
  );
}
export default SwitchAppearance;
