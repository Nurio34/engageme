import CatagorizedNotification from "@/app/(authed-routes)/_globalComponents/SideMenu/DrawerMenu/NotificationsDrawer/CatagorizedNotifications/CatagorizedNotification";
import { CatagorizedNotificationType } from "@/app/(authed-routes)/_globalComponents/SideMenu/DrawerMenu/types";

function CatagorizedNotifications({
  catagorizedNotifications,
}: {
  catagorizedNotifications: CatagorizedNotificationType[];
}) {
  return (
    <ul className="h-full">
      {catagorizedNotifications.map((catagorizedNotification, index) => (
        <CatagorizedNotification
          key={index}
          catagorizedNotification={catagorizedNotification}
        />
      ))}
    </ul>
  );
}
export default CatagorizedNotifications;
