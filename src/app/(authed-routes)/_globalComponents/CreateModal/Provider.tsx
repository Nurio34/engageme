"use client";

import { store } from "@/store";
import { Provider } from "react-redux";
import { ContextProvider } from "./Context";
import dynamic from "next/dynamic";

const Client = dynamic(() => import("./Client"), {
  loading: () => null,
  ssr: false,
});

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
