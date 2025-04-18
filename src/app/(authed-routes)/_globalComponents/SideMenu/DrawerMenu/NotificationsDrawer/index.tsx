import { useAppSelector } from "@/store/hooks";
import { AllNotificationsType } from "../../../../../../../prisma/types/notification";

function NotificationsDrawer({
  navWidth,
  allNotifications,
}: {
  navWidth: number;
  allNotifications: AllNotificationsType;
}) {
  const { isDrawerMenuOpen, currentMenu } = useAppSelector((s) => s.sideMenu);

  // const all = allNotifications.flat()
  console.log({ allNotifications });

  return (
    <div
      className={`fixed z-10 top-0 left-0 w-[397px] h-full  transition-transform duration-500
         bg-base-100 rounded-tr-xl rounded-br-xl shadow-[0px_0px_30px_0px]    
      `}
      style={{
        transform:
          isDrawerMenuOpen && currentMenu === "notifications"
            ? `translateX(calc(0% + ${navWidth}px))`
            : "translateX(-100%)",
      }}
    >
      NotificationsDrawer
    </div>
  );
}
export default NotificationsDrawer;
