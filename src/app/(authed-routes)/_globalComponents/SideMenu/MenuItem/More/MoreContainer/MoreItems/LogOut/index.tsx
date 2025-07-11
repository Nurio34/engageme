"use client";

import { Provider } from "react-redux";
import Client from "./Client";
import { store } from "@/store";

function Logout() {
  return (
    <Provider store={store}>
      <Client />
    </Provider>
  );
}
export default Logout;
