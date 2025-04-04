import { LiaHomeSolid } from "react-icons/lia";
import { TfiSearch } from "react-icons/tfi";
import { MdOutlineExplore } from "react-icons/md";
import { PiVideoDuotone } from "react-icons/pi";
import { LuMessageCircleHeart } from "react-icons/lu";
import { LiaHeart } from "react-icons/lia";
import { MdAddToQueue } from "react-icons/md";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { JSX } from "react";
import ProviderComponent from "./MenuItem/Provider";
import InstagramLogoIcon from "@/app/_globalComponents/Svg/InstagramLogoIcon";

export type MenuType = {
  name: string;
  iconType: "icon" | "image";
  icon: JSX.Element | string;
  type: "link" | "button";
  href?: string;
};

async function SideMenu() {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  const { imageUrl, firstName } = user;

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
      icon: imageUrl,
      type: "link",
      href: firstName!,
    },
  ];

  return (
    <nav
      className="md:px-4 md:py-2 border-t md:border-t-0 md:border-r bg-base-100 md:bg-transparent
        fixed z-10 bottom-0 md:relative 
        min-w-full md:min-w-max lg:min-w-56 md:min-h-screen
      "
    >
      <div
        className="hidden md:flex justify-center lg:justify-start
          text-2xl pt-6 pb-16 
        "
      >
        <div className="block lg:hidden">
          <InstagramLogoIcon />
        </div>
        <div className="hidden lg:block">Engage Me</div>
      </div>
      <ul className="flex justify-evenly md:block md:space-y-[2vh]">
        {menu.map((item) => (
          <ProviderComponent key={item.name} item={item} />
        ))}
      </ul>
    </nav>
  );
}
export default SideMenu;
