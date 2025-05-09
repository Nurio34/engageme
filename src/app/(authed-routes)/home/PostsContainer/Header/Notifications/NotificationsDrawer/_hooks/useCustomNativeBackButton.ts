import { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCurrentMenu } from "@/store/slices/sidemenu";
import { usePathname } from "next/navigation";

type DrawerState = {
  drawerOpen: boolean;
};

export function useCustomNativeBackButton() {
  const { isDrawerMenuOpen } = useAppSelector((s) => s.sideMenu);
  const dispatch = useAppDispatch();
  const path = usePathname().slice(1);

  // we wrap this so we can remove it by reference
  const handlePopState = useCallback(() => {
    // if they hit back while drawer is open, close it
    if (isDrawerMenuOpen) {
      dispatch(setCurrentMenu(path));
    }
  }, [dispatch, isDrawerMenuOpen, path]);

  useEffect(() => {
    if (isDrawerMenuOpen) {
      // push a “fake” state so that the next Back will trigger popstate
      history.pushState({ drawerOpen: true }, "");
      window.addEventListener("popstate", handlePopState);
    } else {
      // drawer just closed by some other button — clean up
      window.removeEventListener("popstate", handlePopState);
      // if our fake state is still on top, pop it off
      if (history.state && (history.state as DrawerState).drawerOpen) {
        history.back();
      }
    }

    // cleanup on unmount
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isDrawerMenuOpen, handlePopState]);
}
