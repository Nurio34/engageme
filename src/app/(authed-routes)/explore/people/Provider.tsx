"use client";

import { store } from "@/store";
import { Provider } from "react-redux";
import Client from "./Client";
import { PrismaRecomendationType } from "../../../../../prisma/types/recomendation";

function ProviderCpmponent({
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
export default ProviderCpmponent;
