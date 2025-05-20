import { useEffect, useState } from "react";
import { requestNotificationPermission } from "./utils/requestNotificationPermission";
import { useAppSelector } from "@/store/hooks";
import { subscribeUser } from "./utils/subscribeUser";

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

  return <div hidden />;
}
export default Client;
