import { useAppDispatch, useAppSelector } from "@/store/hooks";
import CloseButton from "./CloseButton";
import { toggle_WannaCloseCreateModal_Modal } from "@/store/slices/modals";
import DragAndDropArea from "./DragAndDropArea";
import Header from "./Header";
import { useCreateModalContext } from "./Context";

function Client() {
  const { isCreateModalOpen } = useAppSelector((s) => s.modals);
  const dispatch = useAppDispatch();

  const { step, cloudinaryMedias } = useCreateModalContext();
  const { medias } = cloudinaryMedias;

  const tabRenderCond1 = step.step === "edit" || step.step === "post";
  const tabRenderCond2 = medias.length > 0;
  const tabRenderCond = tabRenderCond1 && tabRenderCond2;

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
            className={`relative transition-all w-full 
              ${tabRenderCond ? " md:w-10/12 xl:w-8/12" : "md:w-7/12 xl:w-5/12"}
               h-full md:h-5/6 bg-base-100 md:rounded-lg overflow-hidden
              flex flex-col
            `}
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
// tabRenderCond
// ? "w-full sm:w-11/12 md:w-10/12 xl:w-8/12"
// : "w-9/12 sm:w-8/12 md:w-7/12 xl:w-5/12"
