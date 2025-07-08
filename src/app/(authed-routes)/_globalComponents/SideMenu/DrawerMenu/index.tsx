"use client";

import SearchDrawer from "./SearchDrawer";
import NotificationsDrawer from "./NotificationsDrawer";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCurrentMenu } from "@/store/slices/sidemenu";
import { usePathname } from "next/navigation";
import { PrismaRecomendationType } from "../../../../../../prisma/types/recomendation";

function DrawerMenu({
  navWidth,
  recomendations,
}: {
  navWidth: number;
  recomendations: PrismaRecomendationType[];
}) {
  const { isDrawerMenuOpen } = useAppSelector((s) => s.sideMenu);

  const dispatch = useAppDispatch();

  const path = usePathname()?.split("/")[1];

  return (
    <>
      <SearchDrawer navWidth={navWidth} />
      <NotificationsDrawer
        navWidth={navWidth}
        recomendations={recomendations}
      />
      {isDrawerMenuOpen && (
        <div
          className="fixed z-[1] top-0 left-0 w-screen h-screen"
          onClick={() => dispatch(setCurrentMenu(path))}
        />
      )}
    </>
  );
}
export default DrawerMenu;
