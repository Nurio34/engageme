"use client";

import { store } from "@/store";
import { Provider } from "react-redux";
import Client from "./Client";

function LogoutListener() {
  return (
    <Provider store={store}>
      <Client />
    </Provider>
  );
}
export default LogoutListener;
