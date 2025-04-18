"use client";
import { store } from "@/store";
import { Provider } from "react-redux";
import Client from "./Client";
import { AllNotificationsType } from "../../../../../../prisma/types/notification";

function DrawerMenu({
  navWidth,
  allNotifications,
}: {
  navWidth: number;
  allNotifications: AllNotificationsType;
}) {
  return (
    <Provider store={store}>
      <Client navWidth={navWidth} allNotifications={allNotifications} />
    </Provider>
  );
}
export default DrawerMenu;
