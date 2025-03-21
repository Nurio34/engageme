"use client";

import Image from "next/image";
import { MenuType } from "..";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createAction } from "./actions/createAction";
import { searchAction } from "./actions/searchAction";
import { notificationsAction } from "./actions/notificationsAction";
import { useAppDispatch } from "@/store/hooks";

function MenuItem({ item }: { item: MenuType }) {
  const path = usePathname();
  const isCurrentPath = path === item.href;
  const action =
    item.name === "Notifications"
      ? notificationsAction
      : item.name === "Search"
      ? searchAction
      : createAction;

  const dispatch = useAppDispatch();

  return (
    <li
      key={item.name}
      className="p-1 transition-all hover:bg-base-300 rounded-md"
    >
      <div className="flex items-center gap-x-[1vw]">
        {item.iconType === "icon" ? (
          <div
            className=" text-3xl"
            style={{
              filter: isCurrentPath
                ? "drop-shadow(0 0 0px black) drop-shadow(0 0 0px black) drop-shadow(0 0 0px black)"
                : undefined,
            }}
          >
            {item.icon}
          </div>
        ) : (
          <figure className="relative w-8 aspect-square rounded-full overflow-hidden">
            <Image
              src={item.icon as string}
              fill
              alt="profile image"
              sizes="5vw"
            />
          </figure>
        )}
        {item.type === "link" ? (
          <Link href={item.href!} className="w-full">
            {item.name}
          </Link>
        ) : (
          <button
            className="w-full text-start"
            onClick={() => action(dispatch)}
          >
            {item.name}
          </button>
        )}
      </div>
    </li>
  );
}
export default MenuItem;
