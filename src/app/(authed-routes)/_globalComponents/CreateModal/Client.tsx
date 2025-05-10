import { useAppDispatch, useAppSelector } from "@/store/hooks";
import CloseButton from "./CloseButton";
import { toggle_WannaCloseCreateModal_Modal } from "@/store/slices/modals";
import DragAndDropArea from "./DragAndDropArea";
import Header from "./Header";
import { useCreateModalContext } from "./Context";
import { usePreventRefresh } from "@/hooks/usePreventRefresh";

function Client() {
  const { isCreateModalOpen } = useAppSelector((s) => s.modals);
  usePreventRefresh(isCreateModalOpen);

  const dispatch = useAppDispatch();

  const { step, cloudinaryMedias } = useCreateModalContext();
  const { medias } = cloudinaryMedias;

  const tabRenderCond1 = step.step === "edit" || step.step === "post";
  const tabRenderCond2 = medias.length > 0;
  const tabRenderCond = tabRenderCond1 && tabRenderCond2;

  const askIfWantCreateModal = () =>
    dispatch(toggle_WannaCloseCreateModal_Modal());

  return (
    isCreateModalOpen && (
      <div
        className="fixed z-10 top-0 left-0 w-screen h-screen bg-base-content/70
              flex flex-col justify-center items-center
          "
        onMouseDown={() => {
          if (step.step !== "sharing") askIfWantCreateModal();
        }}
      >
        <CloseButton />
        <div
          className={`relative transition-all  bg-base-100 lg:rounded-lg overflow-hidden
            min-w-full lg:min-w-[734px] 
            ${tabRenderCond ? "md:w-10/12 xl:w-8/12" : ""}
            h-full lg:max-h-[777.38px]
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
    )
  );
}

export default Client;
