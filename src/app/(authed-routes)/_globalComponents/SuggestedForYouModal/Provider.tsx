"use client";

import { store } from "@/store";
import { Provider } from "react-redux";
import Client from "./Client";
import { PrismaRecomendationType } from "../../../../../prisma/types/recomendation";

function ProviderComponent({
  recomendations,
  maxWidth,
}: {
  recomendations: PrismaRecomendationType[];
  maxWidth: number;
}) {
  return (
    <Provider store={store}>
      <Client recomendations={recomendations} maxWidth={maxWidth} />
    </Provider>
  );
}
export default ProviderComponent;
