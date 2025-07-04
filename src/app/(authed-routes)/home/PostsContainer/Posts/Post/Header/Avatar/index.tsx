import {
  handleMouseEnter,
  handleMouseLeave,
} from "@/app/(authed-routes)/_globalComponents/UserModal/_utils/hover";
import GradientCircle from "@/app/_globalComponents/LoadingComponents/GradientCircle";
import { useAppDispatch } from "@/store/hooks";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

function Avatar({
  avatar,
  name,
  setIsContainerHovered,
}: {
  avatar: string | null;
  name: string;
  setIsContainerHovered: Dispatch<SetStateAction<boolean>>;
}) {
  const dispatch = useAppDispatch();

  return (
    <Link
      href={`/${name}`}
      className="relative cursor-pointer"
      onMouseEnter={(e) => {
        handleMouseEnter(e, dispatch);
        setIsContainerHovered(true);
      }}
      onMouseLeave={() => {
        handleMouseLeave(dispatch);
        setIsContainerHovered(false);
      }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <GradientCircle width={44} inset={2} />
      <figure
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-9 aspect-square rounded-full overflow-hidden
        "
      >
        <Image
          src={avatar || "/placeholders/avatar.webp"}
          alt="avatar"
          fill
          sizes="(min-width=1024) 100vw,50vw "
        />
      </figure>
    </Link>
  );
}
export default Avatar;
