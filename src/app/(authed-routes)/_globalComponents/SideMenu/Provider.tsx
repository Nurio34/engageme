"use client";

import { store } from "@/store";
import { Provider } from "react-redux";
import Client from "./Client";
import { AllNotificationsType } from "../../../../../prisma/types/notification";

function ProviderComponent({
  allNotifications,
}: {
  allNotifications: AllNotificationsType | undefined;
}) {
  return (
    <Provider store={store}>
      <Client allNotifications={allNotifications} />
    </Provider>
  );
}
export default ProviderComponent;
