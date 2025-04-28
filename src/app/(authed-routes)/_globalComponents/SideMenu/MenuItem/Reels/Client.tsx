import {
  ReelsIcon,
  ReelsIconFocused,
} from "@/app/_globalComponents/Svg/SideMenuSvgs/ReelsIcon";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { started } from "@/store/slices/routing";
import { setCurrentMenu } from "@/store/slices/sidemenu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

function Client() {
  const { currentMenu, isDrawerMenuOpen } = useAppSelector((s) => s.sideMenu);

  const dispatch = useAppDispatch();

  const path = usePathname().slice(1);

  useEffect(() => {
    if (path === "reels") dispatch(setCurrentMenu("reels"));
  }, [path]);

  return (
    <Link
      href="/reels"
      className="w-full min-w-max flex items-center justify-center lg:justify-start gap-x-4 overflow-hidden
        p-3 md:p-[1.25vh] lg:p-3 rounded-lg order-3 md:order-none
        hover:bg-base-content/10
      "
      onClick={() => {
        if (currentMenu !== "reels" && path !== "reels") dispatch(started());
        dispatch(setCurrentMenu("reels"));
      }}
    >
      {currentMenu === "reels" ? <ReelsIconFocused /> : <ReelsIcon />}
      {!isDrawerMenuOpen && (
        <span
          className={`hidden lg:block ${
            currentMenu === "reels" ? "transition-all font-bold" : ""
          }`}
        >
          Reels
        </span>
      )}
    </Link>
  );
}
export default Client;
