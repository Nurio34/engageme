import { PrismaRecomendationType } from "@/app/api/recomendation/handler/getRecomendations";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleSuggestedForYouModalOpen } from "@/store/slices/modals";
import Modal from "./Modal";
import { useEffect, useRef, useState } from "react";

function Client({
  recomendations,
  maxWidth,
}: {
  recomendations: PrismaRecomendationType[];
  maxWidth: number;
}) {
  const { isSuggestedForYouModalOpen } = useAppSelector((s) => s.modals);
  const dispatch = useAppDispatch();

  const [isRender, setIsRender] = useState(isSuggestedForYouModalOpen);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const toggleModal = () => dispatch(toggleSuggestedForYouModalOpen());

  useEffect(() => {
    if (isSuggestedForYouModalOpen) setIsRender(true);
    else
      timeout.current = setTimeout(() => {
        setIsRender(false);
      }, 200);

    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, [isSuggestedForYouModalOpen]);

  return (
    isRender && (
      <div
        className="fixed top-0 left-0 z-10 w-screen h-screen bg-base-content/80
          flex justify-center items-center px-5
        "
        onClick={toggleModal}
      >
        <Modal recomendations={recomendations} maxWidth={maxWidth} />
      </div>
    )
  );
}
export default Client;
