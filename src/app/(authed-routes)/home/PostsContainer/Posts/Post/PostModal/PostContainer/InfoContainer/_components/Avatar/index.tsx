import GradientCircle from "@/app/_globalComponents/LoadingComponents/GradientCircle";
import Image from "next/image";
import { useInfoContext } from "../../Context";
import { useAppDispatch } from "@/store/hooks";
import {
  handleMouseEnter,
  handleMouseLeave,
} from "@/app/(authed-routes)/_globalComponents/UserModal/_utils/hover";
import Link from "next/link";
import { Dispatch, RefObject, SetStateAction } from "react";

function Avatar({
  name,
  avatar,
  setIsContainerHovered,
  ScrollableContainerRef,
}: {
  name: string;
  avatar: string | null;
  setIsContainerHovered: Dispatch<SetStateAction<boolean>>;
  ScrollableContainerRef?: RefObject<HTMLUListElement | null>;
}) {
  const dispatch = useAppDispatch();

  const { postsState } = useInfoContext();

  if (postsState.length <= 0) return;

  return (
    <Link
      href={`/${name}`}
      className="relative cursor-pointer"
      onMouseEnter={(e) => {
        handleMouseEnter(
          e,
          dispatch,
          "infoContainer",
          ScrollableContainerRef?.current
        );
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
