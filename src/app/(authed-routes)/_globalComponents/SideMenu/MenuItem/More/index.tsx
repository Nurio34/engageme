"use client";
import { store } from "@/store";
import { Provider } from "react-redux";
import Client from "./Client";

function More() {
  return (
    <Provider store={store}>
      <Client />
    </Provider>
  );
}
export default More;
