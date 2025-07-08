import Image from "next/image";
import {
  handleMouseEnter,
  handleMouseLeave,
} from "../../../UserModal/_utils/hover";
import { useAppDispatch } from "@/store/hooks";
import Link from "next/link";
import { InsideOfType } from "../..";
import { Dispatch, RefObject, SetStateAction } from "react";
import { PrismaRecomendationType } from "../../../../../../../prisma/types/recomendation";

function Avatar({
  recomendation,
  insideOf,
  setIsContainerHovered,
  ScrollableContainerRef,
}: {
  recomendation: PrismaRecomendationType;
  insideOf?: InsideOfType;
  setIsContainerHovered: Dispatch<SetStateAction<boolean>>;
  ScrollableContainerRef?: RefObject<HTMLDivElement | null>;
}) {
  const dispatch = useAppDispatch();

  return (
    <Link
      href={`/${recomendation.name}`}
      className="relative w-11 aspect-square border overflow-hidden rounded-full
            flex items-center justify-center cursor-pointer
        "
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
      <Image
        src={recomendation.avatar || "/placeholders/avatar.webp"}
        fill
        alt={`Avatar of ${recomendation.name}`}
        className="object-cover"
        sizes="44px"
      />
    </Link>
  );
}
export default Avatar;
