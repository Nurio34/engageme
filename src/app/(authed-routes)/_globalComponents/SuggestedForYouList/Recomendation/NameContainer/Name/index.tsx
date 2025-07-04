import { useAppDispatch } from "@/store/hooks";
import {
  handleMouseEnter,
  handleMouseLeave,
} from "../../../../UserModal/_utils/hover";
import Link from "next/link";
import { InsideOfType } from "../../..";
import { Dispatch, RefObject, SetStateAction } from "react";

function Name({
  name,
  insideOf,
  setIsContainerHovered,
  ScrollableContainerRef,
}: {
  name: string;
  insideOf?: InsideOfType;
  setIsContainerHovered: Dispatch<SetStateAction<boolean>>;
  ScrollableContainerRef?: RefObject<HTMLDivElement | null>;
}) {
  const dispatch = useAppDispatch();

  return (
    <Link
      href={`/${name}`}
      className="block text-sm font-semibold leading-[18px] max-w-min cursor-pointer"
      onMouseEnter={(e) => {
        handleMouseEnter(
          e,
          dispatch,
          insideOf,
          ScrollableContainerRef?.current
        );
        setIsContainerHovered(true);
      }}
      onMouseLeave={() => {
        handleMouseLeave(dispatch);
        setIsContainerHovered(false);
      }}
    >
      {name}
    </Link>
  );
}
export default Name;
