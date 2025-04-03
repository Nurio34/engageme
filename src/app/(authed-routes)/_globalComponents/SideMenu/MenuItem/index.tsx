"use client";

import Image from "next/image";
import { MenuType } from "..";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createAction } from "./actions/createAction";
import { searchAction } from "./actions/searchAction";
import { notificationsAction } from "./actions/notificationsAction";
import { useAppDispatch } from "@/store/hooks";
import { started } from "@/store/slices/routing";

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
      className={`p-1 transition-all hover:bg-base-300 rounded-md
                ${
                  item.name === "Search" || item.name == "Notifications"
                    ? "hidden md:block"
                    : ""
                }  ü
      `}
    >
      <div className={`flex items-center gap-x-[1vw] p-1`}>
        {item.type === "link" ? (
          <Link
            href={item.href!}
            className="w-full flex items-center justify-center lg:justify-start gap-x-2"
            onClick={() => {
              if (!isCurrentPath) dispatch(started());
            }}
          >
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
            <span className="hidden lg:block"> {item.name}</span>
          </Link>
        ) : (
          <button
            className="w-full flex items-center justify-center lg:justify-start gap-x-2"
            onClick={() => action(dispatch)}
          >
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
            <span className="hidden lg:block"> {item.name}</span>
          </button>
        )}
      </div>
    </li>
  );
}
export default MenuItem;
