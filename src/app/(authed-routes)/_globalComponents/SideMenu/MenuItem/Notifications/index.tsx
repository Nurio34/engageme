import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { usePathname } from "next/navigation";
import { setCurrentMenu } from "@/store/slices/sidemenu";
import {
  NotificationsIcon,
  NotificationsIconFocused,
} from "@/app/_globalComponents/Svg/SideMenuSvgs/NotificationsIcon";
import NotificationsIndicator from "./NotificationsIndicator";

import { useNotificationIndicator } from "./hooks/useNotificationIndicator";
import { useMarkSeenAllUnseenNotifications } from "./hooks/useMarkSeenAllUnseenNotifications";

function Notifications() {
  const { currentMenu, isDrawerMenuOpen } = useAppSelector((s) => s.sideMenu);

  const dispatch = useAppDispatch();

  const path = usePathname().slice(1);

  const { notificationIndicator, isAnyNotification, isRender } =
    useNotificationIndicator();

  useMarkSeenAllUnseenNotifications();

  return (
    <div className="flex items-start">
      <button
        className="w-full min-w-max hidden md:flex items-center justify-center lg:justify-start gap-x-4 overflow-hidden
       hover:bg-base-content/10 rounded-lg md:p-[1.25vh] lg:p-3"
        onClick={() => {
          if (currentMenu === "notifications") dispatch(setCurrentMenu(path));
          else dispatch(setCurrentMenu("notifications"));
        }}
      >
        {currentMenu === "notifications" ? (
          <NotificationsIconFocused />
        ) : (
          <div className="relative">
            <NotificationsIcon />
            {isAnyNotification && !isDrawerMenuOpen && (
              <div
                className="absolute z-10 top-0 -right-[1px]
                w-2 aspect-square rounded-full bg-[rgb(255,48,64)]
              "
              />
            )}
          </div>
        )}
        {!isDrawerMenuOpen && (
          <div
            className={`hidden lg:block ${
              currentMenu === "notifications" ? "transition-all font-bold" : ""
            }`}
          >
            Notifications
          </div>
        )}
      </button>
      {isAnyNotification && !isDrawerMenuOpen && (
        <NotificationsIndicator
          notificationIndicator={notificationIndicator}
          isRender={isRender}
        />
      )}
    </div>
  );
}
export default Notifications;
