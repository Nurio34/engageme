import { useCatagorizedNotifications } from "@/app/(authed-routes)/_globalComponents/SideMenu/DrawerMenu/NotificationsDrawer/_hooks/useCatagorizedNotifications";
import CatagorizedNotification from "@/app/(authed-routes)/_globalComponents/SideMenu/DrawerMenu/NotificationsDrawer/CatagorizedNotification";
import { useAnimatedMount } from "@/hooks/useAnimatedMount";
import { useAppSelector } from "@/store/hooks";
import { useCustomNativeBackButton } from "./_hooks/useCustomNativeBackButton";

function NotificationsDrawer() {
  const { isDrawerMenuOpen } = useAppSelector((s) => s.sideMenu);

  const { isMounted, style } = useAnimatedMount(isDrawerMenuOpen, "translateX");

  const { catagorizedNotifications } = useCatagorizedNotifications();

  useCustomNativeBackButton();

  return (
    isMounted && (
      <div
        className="fixed z-10 top-[49px] left-0 w-screen bg-base-100 overflow-y-auto transition-all"
        style={{ ...style, height: "calc(100vh - 49px)" }}
      >
        <div className="pt-4 pb-6 px-6 text-2xl font-bold">
          <h2>Notifications</h2>
        </div>
        <ul className="h-full">
          {catagorizedNotifications.map((catagorizedNotification, index) => (
            <CatagorizedNotification
              key={index}
              catagorizedNotification={catagorizedNotification}
            />
          ))}
        </ul>
      </div>
    )
  );
}
export default NotificationsDrawer;
