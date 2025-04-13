import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Image from "next/image";
import Link from "next/link";
import { MenuType } from "../..";
import { AppDispatch } from "@/store";
import { started } from "@/store/slices/routing";

function LinkComponent({
  item,
  action,
  isCurrentPath,
}: {
  item: MenuType;
  action: (dispatch: AppDispatch) => void;
  isCurrentPath: boolean;
}) {
  const { username, avatar } = useAppSelector((s) => s.user);
  const dispatch = useAppDispatch();

  return (
    <Link
      href={item.name === "Profile" ? username : item.href!}
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
            src={avatar || "/placeholders/avatar.webp"}
            fill
            alt="profile image"
            sizes="5vw"
          />
        </figure>
      )}
      <span className="hidden lg:block"> {item.name}</span>
    </Link>
  );
}
export default LinkComponent;
