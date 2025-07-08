"use client";

import { Provider } from "react-redux";
import Client from "./Client";
import { store } from "@/store";
import { PrismaRecomendationType } from "../../../../../prisma/types/recomendation";

function ProviderComponent({
  recomendations,
}: {
  recomendations: PrismaRecomendationType[];
}) {
  return (
    <Provider store={store}>
      <Client recomendations={recomendations} />
    </Provider>
  );
}
export default ProviderComponent;
