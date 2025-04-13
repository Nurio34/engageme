import ActivityIcon from "@/app/_globalComponents/Svg/MoreSvgs/ActivityIcon";
import ReportIcon from "@/app/_globalComponents/Svg/MoreSvgs/ReportIcon";
import SettingsIcon from "@/app/_globalComponents/Svg/MoreSvgs/SettingsIcon";
import ThemeIcon from "@/app/_globalComponents/Svg/MoreSvgs/ThemeIcon";
import { useAppSelector } from "@/store/hooks";
import { JSX, useEffect, useRef, useState } from "react";
import MoreItem from "./MoreItem";
import SavedIcon from "@/app/_globalComponents/Svg/MoreSvgs/SavedIcon";
import { animatedMount } from "@/lib/animatedMount";
import UnmountHandler from "./UnmountHandler";

export type MoreItemType = {
  name: string;
  icon?: JSX.Element;
  type: "link" | "button";
  href?: string;
  action?: () => void;
};

function MoreContainer() {
  const { username } = useAppSelector((s) => s.user);

  const moreItems: MoreItemType[] = [
    {
      name: "Settings",
      icon: <SettingsIcon />,
      type: "link",
      href: "/accounts/edit",
    },
    {
      name: "Your activity",
      icon: <ActivityIcon />,
      type: "link",
      href: "/your_activity/interactions/likes",
    },
    {
      name: "Saved",
      icon: <SavedIcon />,
      type: "link",
      href: `/${username}/saved`,
    },
    {
      name: "Switch appearance",
      icon: <ThemeIcon />,
      type: "button",
      action: () => {},
    },
    {
      name: "Report a problem",
      icon: <ReportIcon />,
      type: "button",
      action: () => {},
    },
    {
      name: "Switch accounts",
      type: "button",
      action: () => {},
    },
    {
      name: "Log out",
      type: "button",
      action: () => {},
    },
  ];

  const { isMoreModalOpen } = useAppSelector((s) => s.modals);

  const { isMounted, style } = animatedMount(isMoreModalOpen);

  return (
    <>
      {isMounted && (
        <ul
          className={`absolute z-20 w-64 bottom-10 py-4 bg-base-100 text-base-content shadow-[0px_2px_10px_-2px] rounded-lg transition-all duration-300 transform ${style} `}
        >
          {moreItems.map((item) => (
            <MoreItem key={item.name} item={item} />
          ))}
        </ul>
      )}
      {isMoreModalOpen && <UnmountHandler />}
    </>
  );
}
export default MoreContainer;
