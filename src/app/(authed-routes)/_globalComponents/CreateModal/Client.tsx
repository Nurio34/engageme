import { useAppDispatch, useAppSelector } from "@/store/hooks";
import CloseButton from "./CloseButton";
import { toggleCreateModal } from "@/store/slices/modals";
import DragAndDropArea from "./DragAndDropArea";

function Client() {
  const { isCreateModalOpen } = useAppSelector((s) => s.modals);

  const dispatch = useAppDispatch();

  const closeCreateModal = () => dispatch(toggleCreateModal());

  return (
    <>
      {isCreateModalOpen && (
        <div
          className="fixed top-0 left-0 w-screen h-screen bg-base-content/70
            flex flex-col justify-center items-center
        "
          onClick={closeCreateModal}
        >
          <CloseButton />
          <div
            className="xl:w-5/12 md:w-7/12 sm:w-9/12 w-11/12 h-5/6 bg-base-100 rounded-lg overflow-hidden
                flex flex-col
            "
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="py-[1vh] border-b border-base-content/30 text-center font-semibolD">
              Create New Post
            </div>
            <DragAndDropArea />
          </div>
        </div>
      )}
    </>
  );
}
export default Client;
