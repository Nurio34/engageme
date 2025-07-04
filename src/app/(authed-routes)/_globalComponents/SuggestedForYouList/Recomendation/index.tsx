import { PrismaRecomendationType } from "@/app/api/recomendation/handler/getRecomendations";
import dynamic from "next/dynamic";
import Avatar from "./Avatar";
import NameContainer from "./NameContainer";
import FollowButton from "./FollowButton";
import { RefObject, useState } from "react";
import { InsideOfType } from "..";

const UserModal = dynamic(() => import("../../UserModal"));

function Recomendation({
  recomendation,
  path,
  insideOf,
  ScrollableContainerRef,
}: {
  recomendation: PrismaRecomendationType;
  path: "explore" | "home" | undefined;
  insideOf?: InsideOfType;
  ScrollableContainerRef?: RefObject<HTMLDivElement | null>;
}) {
  const [isContainerHovered, setIsContainerHovered] = useState(false);

  return (
    <li
      key={recomendation.userId}
      className="py-2 px-4
        flex items-center justify-between gap-x-3
      "
    >
      <Avatar
        recomendation={recomendation}
        insideOf={insideOf}
        setIsContainerHovered={setIsContainerHovered}
        ScrollableContainerRef={ScrollableContainerRef}
      />
      <NameContainer
        recomendation={recomendation}
        path={path}
        insideOf={insideOf}
        setIsContainerHovered={setIsContainerHovered}
        ScrollableContainerRef={ScrollableContainerRef}
      />
      <FollowButton path={path} userId={recomendation.userId} />
      <UserModal
        userId={recomendation.userId}
        isContainerHovered={isContainerHovered}
        setIsContainerHovered={setIsContainerHovered}
      />
    </li>
  );
}
export default Recomendation;
