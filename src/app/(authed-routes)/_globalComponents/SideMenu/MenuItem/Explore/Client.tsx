import {
  ExploreIcon,
  ExploreIconFocused,
} from "@/app/_globalComponents/Svg/SideMenuSvgs/ExploreIcon";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { started } from "@/store/slices/routing";
import { setCurrentMenu } from "@/store/slices/sidemenu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

function Client() {
  const { currentMenu, isDrawerMenuOpen } = useAppSelector((s) => s.sideMenu);

  const dispatch = useAppDispatch();

  const path = usePathname()?.slice(1);

  useEffect(() => {
    if (path === "explore") dispatch(setCurrentMenu("explore"));
  }, [path]);

  return (
    <Link
      href="/explore"
      className="w-full min-w-max flex items-center justify-center lg:justify-start gap-x-4 overflow-hidden
        p-3 md:p-[1.25vh] lg:p-3 rounded-lg order-2 md:order-none
        hover:bg-base-content/10
      "
      onClick={() => {
        if (currentMenu !== "explore" && path !== "explore")
          dispatch(started());
        dispatch(setCurrentMenu("explore"));
      }}
    >
      {currentMenu === "explore" ? <ExploreIconFocused /> : <ExploreIcon />}
      {!isDrawerMenuOpen && (
        <span
          className={`hidden lg:block ${
            currentMenu === "explore" ? "transition-all font-bold" : ""
          }`}
        >
          Explore
        </span>
      )}
    </Link>
  );
}
export default Client;
