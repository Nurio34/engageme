"use client";

import { store } from "@/store";
import { Provider } from "react-redux";
import { RecomendationsProvider } from "./Context";
import Client from "./Client";
import { PrismaRecomendationType } from "@/app/api/recomendation/handler/getRecomendations";

function ProviderComponent({
  maxWidth,
  recomendations,
}: {
  maxWidth: number;
  recomendations: PrismaRecomendationType[];
}) {
  return (
    <Provider store={store}>
      <RecomendationsProvider
        maxWidth={maxWidth}
        recomendations={recomendations}
      >
        <Client />
      </RecomendationsProvider>
    </Provider>
  );
}
export default ProviderComponent;
