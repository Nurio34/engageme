import { FiZoomIn } from "react-icons/fi";
import { ActionType } from "../..";
import { Dispatch, SetStateAction } from "react";
import ZoomModal from "./ZoomModal";
import { HandleModalsType } from "..";

function SelectZoom({
  currentAction,
  setCurrentAction,
  handleModals,
  setHandleModals,
  scale,
  setScale,
}: {
  currentAction: ActionType;
  setCurrentAction: Dispatch<SetStateAction<ActionType>>;
  handleModals: HandleModalsType;
  setHandleModals: Dispatch<SetStateAction<HandleModalsType>>;
  scale: number;
  setScale: Dispatch<SetStateAction<number>>;
}) {
  const isThisCurrentAction = currentAction === "zoom";

  const handleCurrentAction = () => {
    setHandleModals((prev) => ({
      isCropModalOpen: false,
      isZoomModalOpen: !prev.isZoomModalOpen,
      isListModalOpen: false,
    }));
    if (isThisCurrentAction) {
      setCurrentAction(null);
    } else {
      setCurrentAction("zoom");
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        title="Select Crop"
        className={`rounded-full w-8 aspect-square 
        flex justify-center items-center p-[2px]
        ${
          isThisCurrentAction
            ? "bg-base-300 hover:bg-base-300/80"
            : "bg-base-content hover:bg-base-content/80"
        }
        `}
        onClick={handleCurrentAction}
      >
        <FiZoomIn
          size={18}
          className={`${
            isThisCurrentAction ? "text-base-content" : "text-base-100"
          }`}
        />
      </button>
      {handleModals.isZoomModalOpen && (
        <ZoomModal scale={scale} setScale={setScale} />
      )}
    </div>
  );
}
export default SelectZoom;
