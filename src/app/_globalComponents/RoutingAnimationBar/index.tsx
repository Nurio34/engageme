"use client";

import { store } from "@/store";
import { Provider } from "react-redux";
import Client from "./Client";
import { Suspense } from "react";

function RoutingAnimationBar() {
  return (
    <Provider store={store}>
      <Suspense>
        <Client />
      </Suspense>
    </Provider>
  );
}
export default RoutingAnimationBar;
