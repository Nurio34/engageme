"use client";

import { Provider } from "react-redux";
import MenuItem from ".";
import { MenuType } from "..";
import { store } from "@/store";

function ProviderComponent({ item }: { item: MenuType }) {
  return (
    <Provider store={store}>
      <MenuItem item={item} />
    </Provider>
  );
}
export default ProviderComponent;
