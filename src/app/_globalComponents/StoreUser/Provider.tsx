"use client";

import { Provider } from "react-redux";
import Client from "./Client";
import { store } from "@/store";

function ProviderComponent({
  id,
  username,
  imageUrl,
  fullname,
}: {
  id: string;
  username: string | null;
  imageUrl: string;
  fullname: string;
}) {
  return (
    <Provider store={store}>
      <Client
        id={id}
        username={username}
        imageUrl={imageUrl}
        fullname={fullname}
      />
    </Provider>
  );
}
export default ProviderComponent;
