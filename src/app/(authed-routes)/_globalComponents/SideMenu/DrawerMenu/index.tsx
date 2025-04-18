"use client";
import { store } from "@/store";
import { Provider } from "react-redux";
import Client from "./Client";

function DrawerMenu({ navWidth }: { navWidth: number }) {
  return (
    <Provider store={store}>
      <Client navWidth={navWidth} />
    </Provider>
  );
}
export default DrawerMenu;
