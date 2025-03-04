import { HiOutlineSquare2Stack } from "react-icons/hi2";
import { ActionType } from "../..";
import { Dispatch, SetStateAction } from "react";
import { HandleModalsType } from "..";
import { useCreateModalContext } from "@/app/(authed-routes)/_globalComponents/CreateModal/Context";
import MediaListModal from "../../../MediaListModal";

function MediaList({
  currentAction,
  setCurrentAction,
  handleModals,
  setHandleModals,
}: {
  currentAction: ActionType;
  setCurrentAction: Dispatch<SetStateAction<ActionType>>;
  handleModals: HandleModalsType;
  setHandleModals: Dispatch<SetStateAction<HandleModalsType>>;
}) {
  const { setIsListModalOpen, isListModalOpen } = useCreateModalContext();

  const isThisCurrentAction = currentAction === "list";

  const handleCurrentAction = () => {
    setHandleModals((prev) => ({
      isCropModalOpen: false,
      isZoomModalOpen: false,
    }));
    setIsListModalOpen((prev) => !prev);

    if (isThisCurrentAction) {
      setCurrentAction(null);
    } else {
      setCurrentAction("list");
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        title="Select Crop"
        className={`rounded-full w-8 aspect-square rotate-180
        flex justify-center items-center p-[2px]
        ${
          isThisCurrentAction
            ? "bg-base-300 hover:bg-base-300/80"
            : "bg-base-content hover:bg-base-content/80"
        }
        `}
        onClick={handleCurrentAction}
      >
        <HiOutlineSquare2Stack
          size={18}
          className={`${
            isThisCurrentAction ? "text-base-content" : "text-base-100"
          }`}
        />
      </button>
      {isListModalOpen && <MediaListModal />}
    </div>
  );
}
export default MediaList;
