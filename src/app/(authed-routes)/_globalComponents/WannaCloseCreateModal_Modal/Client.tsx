import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  toggle_WannaCloseCreateModal_Modal,
  toggleCreateModal,
} from "@/store/slices/modals";
import { deleteFromCloudinary } from "../CreateModal/apiCalls/deleteFromCloudinary";

function Client() {
  const { isWannaCloseCreateModalOpen, cloudinaryMedias } = useAppSelector(
    (s) => s.modals
  );

  const dispatch = useAppDispatch();

  const closeThisModal = () => dispatch(toggle_WannaCloseCreateModal_Modal());

  const closeCreateModal = async () => {
    deleteFromCloudinary(cloudinaryMedias);
    dispatch(toggleCreateModal());
    closeThisModal();
  };

  return (
    <>
      {isWannaCloseCreateModalOpen && (
        <div
          className="fixed w-screen h-screen top-0 left-0 bg-base-content/70 text-center"
          onClick={closeThisModal}
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
              onClick={closeThisModal}
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
