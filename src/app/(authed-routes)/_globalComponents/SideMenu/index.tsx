"use client";

import { LiaHomeSolid } from "react-icons/lia";
import { TfiSearch } from "react-icons/tfi";
import { MdOutlineExplore } from "react-icons/md";
import { PiVideoDuotone } from "react-icons/pi";
import { LuMessageCircleHeart } from "react-icons/lu";
import { LiaHeart } from "react-icons/lia";
import { MdAddToQueue } from "react-icons/md";
import { JSX, useEffect, useRef, useState } from "react";
import ProviderComponent from "./MenuItem/Provider";
import InstagramLogoIcon from "@/app/_globalComponents/Svg/InstagramLogoIcon";
import { FaThreads } from "react-icons/fa6";
import { IoIosMenu } from "react-icons/io";

export type MenuType = {
  name: string;
  iconType: "icon" | "image";
  icon: JSX.Element | string;
  type: "link" | "button";
  href?: string;
};

function SideMenu() {
  const menu: MenuType[] = [
    {
      name: "Home",
      iconType: "icon",
      icon: <LiaHomeSolid />,
      type: "link",
      href: "/home",
    },
    {
      name: "Search",
      iconType: "icon",
      icon: <TfiSearch />,
      type: "button",
    },
    {
      name: "Explore",
      iconType: "icon",
      icon: <MdOutlineExplore />,
      type: "link",
      href: "/explore",
    },
    {
      name: "Reels",
      iconType: "icon",
      icon: <PiVideoDuotone />,
      type: "link",
      href: "/reels",
    },
    {
      name: "Messages",
      iconType: "icon",
      icon: <LuMessageCircleHeart />,
      type: "link",
      href: "/inbox",
    },
    {
      name: "Notifications",
      iconType: "icon",
      icon: <LiaHeart />,
      type: "button",
    },
    {
      name: "Create",
      iconType: "icon",
      icon: <MdAddToQueue />,
      type: "button",
    },
    {
      name: "Profile",
      iconType: "image",
      icon: "imageUrl",
      type: "link",
      href: "username",
    },
    {
      name: "Threads",
      iconType: "icon",
      icon: <FaThreads />,
      type: "link",
      href: "/threads",
    },
    {
      name: "More",
      iconType: "icon",
      icon: <IoIosMenu />,
      type: "button",
    },
  ];

  const NavRef = useRef<HTMLElement | null>(null);
  const [navWidth, setNavWidth] = useState(0);

  useEffect(() => {
    if (NavRef.current)
      setNavWidth(NavRef.current.getBoundingClientRect().width);
  }, []);

  return (
    <div style={{ minWidth: navWidth }}>
      <nav
        ref={NavRef}
        className="md:px-4 md:py-2 border-t md:border-t-0 md:border-r bg-base-100 md:bg-transparent
          fixed z-10 bottom-0 
          min-w-full md:min-w-max lg:min-w-56 md:h-screen
          flex flex-col justify-between
        "
      >
        <div
          className="hidden md:flex justify-center items-center lg:justify-start
            text-2xl h-24
          "
        >
          <div className="block lg:hidden">
            <InstagramLogoIcon />
          </div>
          <div className="hidden lg:block lg:grow">Engage Me</div>
        </div>
        <ul className="md:grow flex md:flex-col justify-evenly md:justify-start ">
          {menu.map((item) => (
            <ProviderComponent key={item.name} item={item} />
          ))}
        </ul>
      </nav>
    </div>
  );
}
export default SideMenu;
