import Name from "./Name";
import Fullname from "./Fullname";
import { InsideOfType } from "../..";
import { Dispatch, RefObject, SetStateAction } from "react";
import { PrismaRecomendationType } from "../../../../../../../prisma/types/recomendation";

function NameContainer({
  recomendation,
  path,
  insideOf,
  setIsContainerHovered,
  ScrollableContainerRef,
}: {
  recomendation: PrismaRecomendationType;
  path: "explore" | "home" | undefined;
  insideOf?: InsideOfType;
  setIsContainerHovered: Dispatch<SetStateAction<boolean>>;
  ScrollableContainerRef?: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="grow">
      <Name
        name={recomendation.name}
        insideOf={insideOf}
        setIsContainerHovered={setIsContainerHovered}
        ScrollableContainerRef={ScrollableContainerRef}
      />
      <Fullname fullname={recomendation.fullname} name={recomendation.name} />
      {path === "explore" && (
        <p className="text-xs font-normal leading-4 text-base-content/50">
          EngageMe Suggested
        </p>
      )}
    </div>
  );
}
export default NameContainer;
