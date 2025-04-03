"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import RecomendationsClient from "./Client";

function Recomendations() {
  return (
    <Provider store={store}>
      <RecomendationsClient />
    </Provider>
  );
}

export default Recomendations;
