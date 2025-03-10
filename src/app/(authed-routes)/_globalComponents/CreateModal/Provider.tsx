"use client";

import { store } from "@/store";
import { Provider } from "react-redux";
import Client from "./Client";
import { ContextProvider } from "./Context";

function ProviderComponent() {
  return (
    <Provider store={store}>
      <ContextProvider>
        <Client />
      </ContextProvider>
    </Provider>
  );
}
export default ProviderComponent;
