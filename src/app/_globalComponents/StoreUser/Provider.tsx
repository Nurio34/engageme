"use client";

import { Provider } from "react-redux";
import Client from "./Client";
import { store } from "@/store";

function ProviderComponent({
  id,
  username,
  imageUrl,
}: {
  id: string;
  username: string | null;
  imageUrl: string;
}) {
  return (
    <Provider store={store}>
      <Client id={id} username={username} imageUrl={imageUrl} />
    </Provider>
  );
}
export default ProviderComponent;
