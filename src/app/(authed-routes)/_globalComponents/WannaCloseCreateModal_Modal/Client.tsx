import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  resterPosterImages,
  toggle_WannaCloseCreateModal_Modal,
  toggleCreateModal,
} from "@/store/slices/modals";
import { deleteFromCloudinary } from "../CreateModal/apiCalls/deleteFromCloudinary";
import { deletePosterImagesFromCloudinary } from "../CreateModal/apiCalls/deletePosterImageFromCloudinary";
import { setCurrentMenu } from "@/store/slices/sidemenu";
import { usePathname } from "next/navigation";

function Client() {
  const {
    isWannaCloseCreateModalOpen,
    cloudinaryMedias,
    posterImages,
    device,
  } = useAppSelector((s) => s.modals);
  const isDesktop = device.type === "desktop";

  const dispatch = useAppDispatch();

  const path = usePathname()?.slice(1);

  const closeThisModal = () => {
    dispatch(toggle_WannaCloseCreateModal_Modal());
  };

  const closeCreateModal = async () => {
    deletePosterImagesFromCloudinary(posterImages);
    deleteFromCloudinary(cloudinaryMedias);
    dispatch(toggleCreateModal());
    closeThisModal();
    dispatch(resterPosterImages());
    dispatch(setCurrentMenu(path!));
  };

  return (
    <>
      {isWannaCloseCreateModalOpen && (
        <div
          className="fixed z-20 w-screen h-screen top-0 left-0 bg-base-content/70 text-center"
          onClick={() => {
            if (!isDesktop) {
              history.pushState(
                { isCreateModalOpen: true },
                "",
                window.location.href
              );
            }
            closeThisModal();
          }}
        >
          <div
            className="absolute top-1/2  left-1/2 -translate-x-1/2 -translate-y-1/2 bg-base-100  rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="py-[2.5vh] px-[2vw] md:px-[8vh]">
              <h2 className="text-xl font-semibold">Discard Post?</h2>
              <p>If you leave, your edits won&apos;t be saved.</p>
            </div>

            <button
              tabIndex={0}
              className="w-full text-error border-y py-[1.2vh] font-bold"
              onClick={closeCreateModal}
            >
              Discard
            </button>
            <button
              type="button"
              className="w-full py-[1.2vh]"
              onClick={() => {
                if (!isDesktop) {
                  history.pushState(
                    { isCreateModalOpen: true },
                    "",
                    window.location.href
                  );
                }
                closeThisModal();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
export default Client;
