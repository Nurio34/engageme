"use client";

import { Provider } from "react-redux";
import Client from "./Client";
import { store } from "@/store";

function Theme() {
  return (
    <Provider store={store}>
      <Client />
    </Provider>
  );
}
export default Theme;
