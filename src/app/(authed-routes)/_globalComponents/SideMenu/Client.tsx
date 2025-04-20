import { JSX, useEffect } from "react";
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
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { AllNotificationsType } from "../../../../../prisma/types/notification";
import { useSidemenuLayout } from "./_hooks/useSidemenuLayout";
import {
  seReplyCommentLikeNotifications,
  seReplyCommentNotifications,
  setPostCommentLikeNotifications,
  setPostCommentNotifications,
  setPostLikeNotifications,
} from "@/store/slices/notifications";

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
  allNotifications: AllNotificationsType | undefined;
}) {
  const { isDrawerMenuOpen } = useAppSelector((s) => s.sideMenu);
  const { device } = useAppSelector((s) => s.modals);
  const isMobile = device.type === "mobile";

  const dispatch = useAppDispatch();

  const { NavRef, navWidth } = useSidemenuLayout();

  useEffect(() => {
    if (allNotifications) {
      const {
        postLikeNotifications,
        postCommentNotifications,
        postCommentLikeNotifications,
        replyCommentNotifications,
        replyCommentLikeNotifications,
      } = allNotifications;
      dispatch(
        setPostLikeNotifications(
          JSON.parse(JSON.stringify(postLikeNotifications))
        )
      );
      dispatch(
        setPostCommentNotifications(
          JSON.parse(JSON.stringify(postCommentNotifications))
        )
      );
      dispatch(
        setPostCommentLikeNotifications(
          JSON.parse(JSON.stringify(postCommentLikeNotifications))
        )
      );
      dispatch(
        seReplyCommentNotifications(
          JSON.parse(JSON.stringify(replyCommentNotifications))
        )
      );
      dispatch(
        seReplyCommentLikeNotifications(
          JSON.parse(JSON.stringify(replyCommentLikeNotifications))
        )
      );
    }
  }, [allNotifications]);

  return (
    <div
      className="relative md:h-screen max-w-min"
      style={{ minWidth: navWidth }}
    >
      {!isMobile && <DrawerMenu navWidth={navWidth} />}
      <nav
        ref={NavRef}
        className={`md:px-3 md:py-2 border-t md:border-t-0 md:border-r bg-base-100
          fixed z-10 bottom-0
          ${
            isDrawerMenuOpen
              ? "min-w-full md:w-[73px] md:min-w-min"
              : "transition-all duration-300 min-w-full md:min-w-0 md:w-[73px] lg:w-[245px] xxl:w-[335px]"
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
