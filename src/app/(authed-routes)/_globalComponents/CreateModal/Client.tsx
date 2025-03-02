import { useAppDispatch, useAppSelector } from "@/store/hooks";
import CloseButton from "./CloseButton";
import { toggle_WannaCloseCreateModal_Modal } from "@/store/slices/modals";
import DragAndDropArea from "./DragAndDropArea";
import Header from "./Header";

function Client() {
  const { isCreateModalOpen } = useAppSelector((s) => s.modals);

  const dispatch = useAppDispatch();
  const askIfWantCreateModal = () =>
    dispatch(toggle_WannaCloseCreateModal_Modal());

  return (
    <>
      {isCreateModalOpen && (
        <div
          className="fixed top-0 left-0 w-screen h-screen bg-base-content/70
            flex flex-col justify-center items-center
        "
          onMouseDown={askIfWantCreateModal}
        >
          <CloseButton />
          <div
            className="xl:w-5/12 md:w-7/12 sm:w-9/12 w-11/12 h-5/6 bg-base-100 rounded-lg overflow-hidden
                flex flex-col
            "
            onMouseDown={(e) => {
              e.stopPropagation();
            }}
          >
            <Header />
            <DragAndDropArea />
          </div>
        </div>
      )}
    </>
  );
}
export default Client;
