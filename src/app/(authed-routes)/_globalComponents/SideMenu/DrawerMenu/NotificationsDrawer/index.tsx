import { useAppSelector } from "@/store/hooks";
import CatagorizedNotification from "./CatagorizedNotification";
import { useCatagorizedNotifications } from "./_hooks/useCatagorizedNotifications";

function NotificationsDrawer({ navWidth }: { navWidth: number }) {
  const { isDrawerMenuOpen, currentMenu } = useAppSelector((s) => s.sideMenu);

  const { catagorizedNotifications } = useCatagorizedNotifications();

  return (
    <div
      className={`fixed z-10 top-0 left-0 w-[397px] h-full overflow-y-auto  transition-transform duration-300
         bg-base-100 rounded-tr-xl rounded-br-xl shadow-[0px_0px_30px_0px] py-2 pr-2  
      `}
      style={{
        transform:
          isDrawerMenuOpen && currentMenu === "notifications"
            ? `translateX(calc(0% + ${navWidth}px))`
            : "translateX(-100%)",
      }}
    >
      <div className="pt-4 pb-6 px-6 text-2xl font-bold">
        <h2>Notifications</h2>
      </div>
      <ul className="overflow-y-auto">
        {catagorizedNotifications.map((catagorizedNotification, index) => (
          <CatagorizedNotification
            key={index}
            catagorizedNotification={catagorizedNotification}
          />
        ))}
      </ul>
    </div>
  );
}
export default NotificationsDrawer;
