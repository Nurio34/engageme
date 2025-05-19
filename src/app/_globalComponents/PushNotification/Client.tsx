import { useEffect, useState } from "react";
import { requestNotificationPermission } from "./utils/requestNotificationPermission";
import { useAppSelector } from "@/store/hooks";
import { subscribeUser } from "./utils/subscribeUser";
import { pushNotification } from "./actions/pushNotification";

function Client() {
  const { id: userId } = useAppSelector((s) => s.user);

  const [isRequestPermissionGranted, setIsRequestPermissionGranted] =
    useState(false);

  useEffect(() => {
    const requestNotificationPermissionAction = async () => {
      try {
        const { status } = await requestNotificationPermission();

        if (status === "success") setIsRequestPermissionGranted(true);
      } catch (error) {
        console.error(error);
      }
    };

    requestNotificationPermissionAction();
  }, []);

  useEffect(() => {
    if (isRequestPermissionGranted) {
      const subscribeUserAction = async () => {
        try {
          await subscribeUser(userId);
        } catch (error) {
          console.error(error);
        }
      };

      subscribeUserAction();
    }
  }, [isRequestPermissionGranted]);

  const pushNotificationAction = async () => {
    try {
      await pushNotification(userId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      type="button"
      className="fixed top-1  right-10 btn btn-primary"
      onClick={pushNotificationAction}
    >
      Push
    </button>
  );
}
export default Client;
