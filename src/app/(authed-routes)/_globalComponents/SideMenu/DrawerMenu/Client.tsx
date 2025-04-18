import SearchDrawer from "./SearchDrawer";
import NotificationsDrawer from "./NotificationsDrawer";
import { AllNotificationsType } from "../../../../../../prisma/types/notification";

function Client({
  navWidth,
  allNotifications,
}: {
  navWidth: number;
  allNotifications: AllNotificationsType;
}) {
  return (
    <>
      <SearchDrawer navWidth={navWidth} />
      <NotificationsDrawer
        navWidth={navWidth}
        allNotifications={allNotifications}
      />
    </>
  );
}
export default Client;
