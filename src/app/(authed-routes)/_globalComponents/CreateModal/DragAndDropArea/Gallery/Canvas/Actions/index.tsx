import { Dispatch, SetStateAction, useEffect, useState } from "react";
import FilesIndicator from "./FilesIndicator";
import MediaList from "./MediaList";
import SelectCrop from "./SelectCrop";
import SelectZoom from "./SelectZoom";
import { ActionType } from "..";
import { useCreateModalContext } from "../../../../Context";

export type HandleModalsType = {
  isCropModalOpen: boolean;
  isZoomModalOpen: boolean;
};

function Actions({
  isVideo,
  setRatioState,
  scale,
  setScale,
}: {
  isVideo: boolean;
  setRatioState: Dispatch<SetStateAction<number>>;
  scale: number;
  setScale: Dispatch<SetStateAction<number>>;
}) {
  const { isAllModalsClosed } = useCreateModalContext();

  const [currentAction, setCurrentAction] = useState<ActionType>(null);

  const [handleModals, setHandleModals] = useState<HandleModalsType>({
    isCropModalOpen: false,
    isZoomModalOpen: false,
  });

  useEffect(() => {
    if (isAllModalsClosed) {
      setHandleModals({ isCropModalOpen: false, isZoomModalOpen: false });
      setCurrentAction((prev) => {
        if (prev === "list") {
          return "list";
        }
        return null;
      });
    }
  }, [isAllModalsClosed]);

  return (
    <div
      className="absolute bottom-0 z-10 w-full px-4 py-[1.5vh]
          flex items-center justify-between
      "
    >
      <div className="flex items-center gap-x-[2vw]">
        <SelectCrop
          currentAction={currentAction}
          setCurrentAction={setCurrentAction}
          handleModals={handleModals}
          setHandleModals={setHandleModals}
          setRatioState={setRatioState}
        />
        {!isVideo && (
          <SelectZoom
            currentAction={currentAction}
            setCurrentAction={setCurrentAction}
            handleModals={handleModals}
            setHandleModals={setHandleModals}
            scale={scale}
            setScale={setScale}
          />
        )}
      </div>
      <FilesIndicator />
      <MediaList
        currentAction={currentAction}
        setCurrentAction={setCurrentAction}
        setHandleModals={setHandleModals}
      />
    </div>
  );
}
export default Actions;
