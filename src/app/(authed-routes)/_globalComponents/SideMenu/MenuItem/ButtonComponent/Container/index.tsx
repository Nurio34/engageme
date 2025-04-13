import Image from "next/image";
import { MenuType } from "../../..";
import { AppDispatch } from "@/store";
import { useAppDispatch } from "@/store/hooks";
import { ReactNode } from "react";

function Container({
  children,
  item,
  action,
  isCurrentPath,
}: {
  children?: ReactNode;
  item: MenuType;
  action: (dispatch: AppDispatch) => void;
  isCurrentPath: boolean;
}) {
  const dispatch = useAppDispatch();

  return (
    <div className="grow relative">
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
        <span className="hidden lg:block "> {item.name}</span>
      </button>
      {children}
    </div>
  );
}
export default Container;
