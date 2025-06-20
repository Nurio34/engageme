import {
  MessagesIcon,
  MessagesIconFocused,
} from "@/app/_globalComponents/Svg/SideMenuSvgs/MessagesIcon";
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
    if (path === "messages") dispatch(setCurrentMenu("messages"));
  }, [path]);

  return (
    <Link
      href="/messages"
      className="w-full min-w-max flex items-center justify-center lg:justify-start gap-x-4 overflow-hidden
      p-3 md:p-[1.25vh] lg:p-3 rounded-lg order-5 md:order-none
      hover:bg-base-content/10
    "
      onClick={() => {
        if (currentMenu !== "messages" && path !== "messages")
          dispatch(started());
        dispatch(setCurrentMenu("messages"));
      }}
    >
      {currentMenu === "messages" ? <MessagesIconFocused /> : <MessagesIcon />}
      {!isDrawerMenuOpen && (
        <span
          className={`hidden lg:block ${
            currentMenu === "messages" ? "transition-all font-bold" : ""
          }`}
        >
          Messages
        </span>
      )}
    </Link>
  );
}
export default Client;
