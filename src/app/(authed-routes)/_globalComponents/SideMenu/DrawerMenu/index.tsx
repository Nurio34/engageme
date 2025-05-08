"use client";

import SearchDrawer from "./SearchDrawer";
import NotificationsDrawer from "./NotificationsDrawer";

function DrawerMenu({ navWidth }: { navWidth: number }) {
  return (
    <>
      <SearchDrawer navWidth={navWidth} />
      <NotificationsDrawer navWidth={navWidth} />
    </>
  );
}
export default DrawerMenu;
