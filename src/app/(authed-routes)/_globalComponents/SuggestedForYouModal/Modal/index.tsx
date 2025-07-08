import { useAppSelector } from "@/store/hooks";
import { useEffect, useRef, useState } from "react";
import Header from "./Header";
import DiscoverMoreAccounts from "./DiscoverMoreAccounts";
import SuggestedForYouList from "../../SuggestedForYouList";
import { PrismaRecomendationType } from "../../../../../../prisma/types/recomendation";

function Modal({
  recomendations,
  maxWidth,
}: {
  recomendations: PrismaRecomendationType[];
  maxWidth: number;
}) {
  const { isSuggestedForYouModalOpen } = useAppSelector((s) => s.modals);
  const [isRender, setIsRender] = useState(!isSuggestedForYouModalOpen);

  const ScrollableContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isSuggestedForYouModalOpen) setIsRender(true);
    else setIsRender(false);
  }, [isSuggestedForYouModalOpen]);

  return (
    <div
      className={`w-screen rounded-3xl bg-base-100 transition-all duration-500
        flex flex-col
        ${isRender ? "opacity-100 scale-100" : "opacity-0 scale-90"}    
    `}
      style={{ maxWidth, height: 457 }}
      onClick={(e) => e.stopPropagation()}
    >
      <Header />
      <div ref={ScrollableContainerRef} className="overflow-y-auto">
        <DiscoverMoreAccounts />
        <SuggestedForYouList
          maxWidth={maxWidth}
          recomendations={recomendations}
          insideOf="suggestedForYouModal"
          ScrollableContainerRef={ScrollableContainerRef}
        />
      </div>
    </div>
  );
}
export default Modal;
