"use client";

import { store } from "@/store";
import { Provider } from "react-redux";
import Client from "./Client";
import { PrismaRecomendationType } from "../../../../../../prisma/types/recomendation";

function ProviderComponent({
  recomendations,
  variant,
}: {
  recomendations: PrismaRecomendationType[];
  variant: string | undefined;
}) {
  return (
    <Provider store={store}>
      <Client recomendations={recomendations} variant={variant} />
    </Provider>
  );
}
export default ProviderComponent;
