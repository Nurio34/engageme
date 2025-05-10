import { useCatagorizedNotifications } from "@/app/(authed-routes)/_globalComponents/SideMenu/DrawerMenu/NotificationsDrawer/_hooks/useCatagorizedNotifications";
import CatagorizedNotification from "@/app/(authed-routes)/_globalComponents/SideMenu/DrawerMenu/NotificationsDrawer/CatagorizedNotification";
import { useAnimatedMount } from "@/hooks/useAnimatedMount";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCurrentMenu } from "@/store/slices/sidemenu";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

function NotificationsDrawer() {
  const { isDrawerMenuOpen } = useAppSelector((s) => s.sideMenu);

  const dispatch = useAppDispatch();

  const path = usePathname().slice(1);

  const { isMounted, style } = useAnimatedMount(isDrawerMenuOpen, "translateX");

  const { catagorizedNotifications } = useCatagorizedNotifications();

  //! *** push history state when "isCreateModalOpen === true" ( for mobile native back button manipulation ) ***
  useEffect(() => {
    if (isDrawerMenuOpen)
      history.pushState({ isDrawerMenuOpen: true }, "", window.location.href);

    const handlePopState = () => {
      if (isDrawerMenuOpen) dispatch(setCurrentMenu(path));
    };

    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  }, [isDrawerMenuOpen]);

  //! ***********************************************************************************************************

  return (
    isMounted && (
      <div
        className="fixed z-10 top-[49px] left-0 w-screen bg-base-100 overflow-y-auto  duration-[400ms]"
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
