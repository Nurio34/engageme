"use client";

import { Provider } from "react-redux";
import Client from "./Client";
import { store } from "@/store";

function GradientCircle({
  isLoading,
  width,
  inset,
}: {
  isLoading?: boolean;
  width?: number;
  inset?: number;
}) {
  return (
    <Provider store={store}>
      <Client isLoading={isLoading} width={width} inset={inset} />
    </Provider>
  );
}
export default GradientCircle;
