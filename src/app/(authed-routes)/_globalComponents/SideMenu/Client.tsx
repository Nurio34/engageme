import { JSX, useEffect, useRef, useState } from "react";
import Home from "./MenuItem/Home";
import Search from "./MenuItem/Search";
import Explore from "./MenuItem/Explore/";
import Reels from "./MenuItem/Reels";
import Messages from "./MenuItem/Messages";
import Notifications from "./MenuItem/Notifications";
import Create from "./MenuItem/Create";
import Profile from "./MenuItem/Profile";
import Threads from "./MenuItem/Threads";
import More from "./MenuItem/More";
import Logo from "./Logo";
import DrawerMenu from "./DrawerMenu";
import { useAppSelector } from "@/store/hooks";
import { AllNotificationsType } from "../../../../../prisma/types/notification";

export type MenuType = {
  name: string;
  component: JSX.Element;
};

const menu: MenuType[] = [
  {
    name: "Home",
    component: <Home />,
  },
  {
    name: "Search",
    component: <Search />,
  },
  {
    name: "Explore",
    component: <Explore />,
  },
  {
    name: "Reels",
    component: <Reels />,
  },
  {
    name: "Messages",
    component: <Messages />,
  },
  {
    name: "Notifications",
    component: <Notifications />,
  },
  {
    name: "Create",
    component: <Create />,
  },
  {
    name: "Profile",
    component: <Profile />,
  },
  {
    name: "Threads",
    component: <Threads />,
  },
  {
    name: "More",
    component: <More />,
  },
];

function Client({
  allNotifications,
}: {
  allNotifications: AllNotificationsType;
}) {
  const { isDrawerMenuOpen } = useAppSelector((s) => s.sideMenu);
  const { device } = useAppSelector((s) => s.modals);
  const isMobile = device.type === "mobile";

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

  return (
    <div className="relative md:h-screen bg-red-50" style={{ width: navWidth }}>
      {!isMobile && (
        <DrawerMenu navWidth={navWidth} allNotifications={allNotifications} />
      )}
      <nav
        ref={NavRef}
        className={`md:px-3 md:py-2 border-t md:border-t-0 md:border-r bg-base-100
          fixed z-10 bottom-0
          ${
            isDrawerMenuOpen
              ? "w-[73px] "
              : "transition-all duration-500 overflow-hidden min-w-full md:min-w-0 md:w-[73px] lg:w-[245px] xxl:w-[335px]"
          } md:h-screen
          flex flex-col justify-between
        `}
      >
        <Logo />
        <ul className="md:grow flex md:flex-col lg:gap-y-2 justify-evenly md:justify-start ">
          {menu.map((item) => (
            <li key={item.name} className={`contents`}>
              {item.component}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
export default Client;
