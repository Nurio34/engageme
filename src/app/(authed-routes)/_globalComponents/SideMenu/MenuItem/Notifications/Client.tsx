import {
  NotificationsIcon,
  NotificationsIconFocused,
} from "@/app/_globalComponents/Svg/SideMenuSvgs/NotificationsIcon";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCurrentMenu } from "@/store/slices/sidemenu";
import { usePathname } from "next/navigation";

function Client() {
  const { currentMenu, isDrawerMenuOpen } = useAppSelector((s) => s.sideMenu);

  const dispatch = useAppDispatch();

  const path = usePathname().slice(1);

  return (
    <>
      <button
        className="w-full min-w-max hidden md:flex items-center justify-center lg:justify-start gap-x-4
      hover:bg-base-content/10 rounded-lg md:p-[1.25vh] lg:p-3"
        onClick={() => {
          if (currentMenu === "notifications") dispatch(setCurrentMenu(path));
          else dispatch(setCurrentMenu("notifications"));
        }}
      >
        {currentMenu === "notifications" ? (
          <NotificationsIconFocused />
        ) : (
          <NotificationsIcon />
        )}
        {!isDrawerMenuOpen && (
          <span
            className={`hidden lg:block ${
              currentMenu === "notifications" ? "transition-all font-bold" : ""
            }`}
          >
            Notifications
          </span>
        )}
      </button>
    </>
  );
}
export default Client;
