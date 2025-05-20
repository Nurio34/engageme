import { requestNotificationPermission } from "@/app/(authed-routes)/_globalComponents/PushNotification/utils/requestNotificationPermission";
import { subscribeUser } from "@/app/(authed-routes)/_globalComponents/PushNotification/utils/subscribeUser";
import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";

function NotificationsPermissionRequestButton() {
  const { id: userId } = useAppSelector((s) => s.user);

  const [isRequestPermissionGranted, setIsRequestPermissionGranted] =
    useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Runs only on client
    setIsClient(true);
  }, []);

  const requestNotificationPermissionAction = async () => {
    try {
      const { status } = await requestNotificationPermission();
      if (status === "success") setIsRequestPermissionGranted(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isRequestPermissionGranted && userId) {
      const subscribeUserAction = async () => {
        try {
          await subscribeUser(userId);
        } catch (error) {
          console.error(error);
        }
      };

      subscribeUserAction();
    }
  }, [isRequestPermissionGranted, userId]);

  if (
    !isClient ||
    typeof window === "undefined" ||
    typeof Notification === "undefined"
  ) {
    return null;
  }

  if (Notification.permission === "granted") {
    return null;
  }

  return (
    <button
      type="button"
      className="bg-secondary/90 text-primary-content rounded-lg p-2 transition-all
        hover:scale-105 active:scale-95"
      onClick={requestNotificationPermissionAction}
    >
      <IoIosNotificationsOutline />
    </button>
  );
}

export default NotificationsPermissionRequestButton;
