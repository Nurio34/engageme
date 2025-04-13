"use client";

import { MenuType } from "..";
import { usePathname } from "next/navigation";
import { createAction } from "./actions/createAction";
import { searchAction } from "./actions/searchAction";
import { notificationsAction } from "./actions/notificationsAction";
import { moreAction } from "./actions/moreAction";
import LinkComponent from "./LinkComponent";
import ButtonComponent from "./ButtonComponent";

function MenuItem({ item }: { item: MenuType }) {
  const action =
    item.name === "Notifications"
      ? notificationsAction
      : item.name === "Search"
      ? searchAction
      : item.name === "Create"
      ? createAction
      : moreAction;

  const path = usePathname();
  const isCurrentPath = path === item.href;
  return (
    <li
      key={item.name}
      className={`p-1 transition-all hover:bg-base-300 rounded-md mb-3
                ${
                  item.name === "Search" ||
                  item.name == "Notifications" ||
                  item.name == "Threads" ||
                  item.name == "More"
                    ? "hidden md:block"
                    : ""
                }
                ${item.name === "Threads" ? "mt-auto" : ""}
                ${isCurrentPath ? "font-extrabold" : ""}
                ${
                  item.name == "Home"
                    ? "order-1 md:order-1"
                    : item.name == "Explore"
                    ? "order-2 md:order-2"
                    : item.name == "Reels"
                    ? "order-3 md:order-3"
                    : item.name == "Messages"
                    ? "order-5 md:order-4"
                    : item.name == "Create"
                    ? "order-4 md:order-5"
                    : "order-6 md:order-6"
                }
      `}
    >
      <div className={`flex items-center gap-x-[1vw] p-1`}>
        {item.type === "link" ? (
          <LinkComponent
            item={item}
            action={action}
            isCurrentPath={isCurrentPath}
          />
        ) : (
          <ButtonComponent
            item={item}
            action={action}
            isCurrentPath={isCurrentPath}
          />
        )}
      </div>
    </li>
  );
}
export default MenuItem;
