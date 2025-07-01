"use client";

import { store } from "@/store";
import { Provider } from "react-redux";
import Client from "./Client";
import { AllNotificationsType } from "../../../../../prisma/types/notification";
import { PrismaRecomendationType } from "@/app/api/recomendation/handler/getRecomendations";

function ProviderComponent({
  allNotifications,
  recomendations,
}: {
  allNotifications: AllNotificationsType | undefined;
  recomendations: PrismaRecomendationType[];
}) {
  return (
    <Provider store={store}>
      <Client
        allNotifications={allNotifications}
        recomendations={recomendations}
      />
    </Provider>
  );
}
export default ProviderComponent;
