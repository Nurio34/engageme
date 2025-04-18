import { useAppSelector } from "@/store/hooks";
import { useEffect, useRef, useState } from "react";

export const useSidemenuLayout = () => {
  const { isDrawerMenuOpen } = useAppSelector((s) => s.sideMenu);

  const NavRef = useRef<HTMLElement | null>(null);
  const [navWidth, setNavWidth] = useState(0);

  useEffect(() => {
    const handleNavWidth = () => {
      if (NavRef.current)
        setNavWidth(NavRef.current.getBoundingClientRect().width);
    };

    handleNavWidth();

    window.addEventListener("resize", handleNavWidth);

    return () => window.removeEventListener("resize", handleNavWidth);
  }, [isDrawerMenuOpen]);

  return { NavRef, navWidth };
};
