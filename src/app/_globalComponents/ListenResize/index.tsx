"use client";

import { store } from "@/store";
import { Provider } from "react-redux";
import ListenResizeClient from "./Client";

function ListenResize() {
  return (
    <Provider store={store}>
      <ListenResizeClient />
    </Provider>
  );
}
export default ListenResize;
