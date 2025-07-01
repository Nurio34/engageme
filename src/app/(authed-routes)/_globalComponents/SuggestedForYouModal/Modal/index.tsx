import { PrismaRecomendationType } from "@/app/api/recomendation/handler/getRecomendations";
import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import Header from "./Header";
import DiscoverMoreAccounts from "./DiscoverMoreAccounts";
import SuggestedForYouList from "../../SuggestedForYouList";

function Modal({
  recomendations,
  maxWidth,
}: {
  recomendations: PrismaRecomendationType[];
  maxWidth: number;
}) {
  const { isSuggestedForYouModalOpen } = useAppSelector((s) => s.modals);
  const [isRender, setIsRender] = useState(!isSuggestedForYouModalOpen);

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
      <div className="overflow-y-auto">
        <DiscoverMoreAccounts />
        <SuggestedForYouList
          maxWidth={maxWidth}
          recomendations={recomendations}
        />
      </div>
    </div>
  );
}
export default Modal;
