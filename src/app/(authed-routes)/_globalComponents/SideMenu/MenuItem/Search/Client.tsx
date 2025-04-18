import {
  SearchIcon,
  SearchIconFocused,
} from "@/app/_globalComponents/Svg/SideMenuSvgs/SearchIcon";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCurrentMenu } from "@/store/slices/sidemenu";
import { usePathname } from "next/navigation";

function Client() {
  const { currentMenu, isDrawerMenuOpen } = useAppSelector((s) => s.sideMenu);

  const dispatch = useAppDispatch();

  const path = usePathname().slice(1);

  return (
    <button
      className="w-full min-w-max hidden md:flex items-center justify-center lg:justify-start gap-x-4
        hover:bg-base-content/10 rounded-lg p-3
        
      "
      onClick={() => {
        if (currentMenu === "search") dispatch(setCurrentMenu(path));
        else dispatch(setCurrentMenu("search"));
      }}
    >
      {currentMenu === "search" ? <SearchIconFocused /> : <SearchIcon />}
      {!isDrawerMenuOpen && (
        <span
          className={`hidden lg:block ${
            currentMenu === "search" ? "transition-all font-bold" : ""
          }`}
        >
          Search
        </span>
      )}
    </button>
  );
}
export default Client;
