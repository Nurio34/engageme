"use client";

import { Provider } from "react-redux";
import Client from "./Client";
import { store } from "@/store";
import { User } from "@clerk/nextjs/server";

function ProviderComponent({
  username,
  imageUrl,
}: {
  username: string | null;
  imageUrl: string;
}) {
  return (
    <Provider store={store}>
      <Client username={username} imageUrl={imageUrl} />
    </Provider>
  );
}
export default ProviderComponent;
