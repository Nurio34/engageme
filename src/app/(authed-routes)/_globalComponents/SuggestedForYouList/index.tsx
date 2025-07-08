"use client";

import { PrismaRecomendationType } from "../../../../../prisma/types/recomendation";
import Recomendation from "./Recomendation";
import { RefObject } from "react";

export type InsideOfType =
  | "notifications"
  | "suggestedForYouModal"
  | "infoContainer"
  | "mobileNotifications";

function SuggestedForYouList({
  maxWidth,
  recomendations,
  path,
  insideOf,
  ScrollableContainerRef,
}: {
  maxWidth: number;
  recomendations: PrismaRecomendationType[];
  path?: "explore" | "home";
  insideOf?: InsideOfType;
  ScrollableContainerRef?: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      className="w-full flex justify-center"
      onContextMenu={(e) => e.preventDefault()}
    >
      <ul className="w-full" style={{ maxWidth }}>
        {recomendations.map((recomendation) => (
          <Recomendation
            key={recomendation.userId}
            recomendation={recomendation}
            path={path}
            insideOf={insideOf}
            ScrollableContainerRef={ScrollableContainerRef}
          />
        ))}
      </ul>
    </div>
  );
}
export default SuggestedForYouList;
