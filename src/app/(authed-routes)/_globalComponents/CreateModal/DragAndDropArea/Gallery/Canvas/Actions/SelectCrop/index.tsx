import { IoIosArrowBack } from "react-icons/io";
import { Dispatch, SetStateAction } from "react";
import CropModal from "./CropModal";
import { ActionType } from "../..";
import { HandleModalsType } from "..";
import { useCreateModalContext } from "@/app/(authed-routes)/_globalComponents/CreateModal/Context";

function SelectCrop({
  currentAction,
  setCurrentAction,
  handleModals,
  setHandleModals,
  setRatioState,
}: {
  currentAction: ActionType;
  setCurrentAction: Dispatch<SetStateAction<ActionType>>;
  handleModals: HandleModalsType;
  setHandleModals: Dispatch<SetStateAction<HandleModalsType>>;
  setRatioState: Dispatch<SetStateAction<number>>;
}) {
  const { setIsListModalOpen } = useCreateModalContext();

  const isThisCurrentAction = currentAction === "crop";

  const handleCurrentAction = () => {
    setHandleModals((prev) => ({
      isCropModalOpen: !prev.isCropModalOpen,
      isZoomModalOpen: false,
    }));

    setIsListModalOpen(false);

    if (isThisCurrentAction) {
      setCurrentAction(null);
    } else {
      setCurrentAction("crop");
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        title="Select Crop"
        className={`rounded-full w-8 aspect-square 
          flex gap-x-[2px] items-center -rotate-45 p-[2px]
          ${
            isThisCurrentAction
              ? "bg-base-300 hover:bg-base-300/80"
              : "bg-base-content hover:bg-base-content/80"
          }
        `}
        onClick={handleCurrentAction}
      >
        <div>
          <IoIosArrowBack
            size={12}
            className={`${
              isThisCurrentAction ? "text-base-content" : "text-base-100"
            }`}
          />
        </div>
        <div className="rotate-180">
          <IoIosArrowBack
            size={12}
            className={`${
              isThisCurrentAction ? "text-base-content" : "text-base-100"
            }`}
          />
        </div>
      </button>
      {handleModals.isCropModalOpen && (
        <CropModal setRatioState={setRatioState} />
      )}
    </div>
  );
}
export default SelectCrop;
