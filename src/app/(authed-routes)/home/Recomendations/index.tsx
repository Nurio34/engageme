"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import RecomendationsClient from "./Client";
import { PrismaRecomendationType } from "@/app/api/recomendation/handler/getRecomendations";

function Recomendations({
  recomendations,
}: {
  recomendations: PrismaRecomendationType[];
}) {
  return (
    <Provider store={store}>
      <RecomendationsClient recomendations={recomendations} />
    </Provider>
  );
}

export default Recomendations;
