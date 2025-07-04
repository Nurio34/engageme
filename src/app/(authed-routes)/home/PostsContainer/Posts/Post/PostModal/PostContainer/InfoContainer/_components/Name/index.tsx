import { useAppDispatch } from "@/store/hooks";
import {
  handleMouseEnter,
  handleMouseLeave,
} from "@/app/(authed-routes)/_globalComponents/UserModal/_utils/hover";
import Link from "next/link";
import { Dispatch, RefObject, SetStateAction } from "react";

function Name({
  name,
  setIsContainerHovered,
  ScrollableContainerRef,
}: {
  name: string;
  setIsContainerHovered: Dispatch<SetStateAction<boolean>>;
  ScrollableContainerRef?: RefObject<HTMLUListElement | null>;
}) {
  const dispatch = useAppDispatch();

  return (
    <Link
      href={`/${name}`}
      className="font-semibold cursor-pointer max-w-min"
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
      {name}
    </Link>
  );
}
export default Name;
