"use client";

import { store } from "@/store";
import { Provider } from "react-redux";
import Client from "./client";

function AddComment() {
  return (
    <Provider store={store}>
      <Client />
    </Provider>
  );
}
export default AddComment;
