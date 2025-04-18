import {
  HomeIcon,
  HomeIconFocused,
} from "@/app/_globalComponents/Svg/SideMenuSvgs/HomeIcon";
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
    if (path === "home") dispatch(setCurrentMenu("home"));
  }, [path]);

  return (
    <Link
      href="/home"
      className="w-full min-w-max flex items-center justify-center lg:justify-start gap-x-4
        p-3 rounded-lg order-1 md:order-none
        hover:bg-base-content/10
      "
      onClick={() => {
        if (currentMenu !== "home" && path !== "home") dispatch(started());
        dispatch(setCurrentMenu("home"));
      }}
    >
      {currentMenu === "home" ? <HomeIconFocused /> : <HomeIcon />}
      {!isDrawerMenuOpen && (
        <span
          className={`hidden lg:block ${
            currentMenu === "home" ? "transition-all font-bold" : ""
          }`}
        >
          Home
        </span>
      )}
    </Link>
  );
}
export default Client;
