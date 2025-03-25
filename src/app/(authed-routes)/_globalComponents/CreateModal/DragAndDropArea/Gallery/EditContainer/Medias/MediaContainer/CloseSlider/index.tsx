import { Dispatch, RefObject, SetStateAction } from "react";
import { EditTabTranslateXType, TouchXType } from "./useEditTabControl";
import { useCreateModalContext } from "@/app/(authed-routes)/_globalComponents/CreateModal/Context";

function CloseSlider({
  editTabTranslateX,
  setEditTabTranslateX,
  EditTabWidth,
  setTouchX,
  setIsEditRequested,
}: {
  editTabTranslateX: EditTabTranslateXType;
  setEditTabTranslateX: Dispatch<SetStateAction<EditTabTranslateXType>>;
  EditTabWidth: RefObject<number>;
  setTouchX: Dispatch<SetStateAction<TouchXType>>;
  setIsEditRequested: Dispatch<SetStateAction<boolean>>;
}) {
  const { step } = useCreateModalContext();

  return (
    <div
      className=" md:hidden absolute top-0 left-0 -translate-x-full w-7 h-full bg-base-content rounded-tl-lg rounded-bl-lg
        flex justify-center items-center gap-1
      "
      onTouchStart={(e) => {
        const touch = e.touches[0];
        const { clientX } = touch;
        setTouchX((prev) => ({
          ...prev,
          start: clientX,
          end: clientX,
          isDragEnd: false,
        }));
      }}
      onTouchMove={(e) => {
        const touch = e.touches[0];
        const { clientX } = touch;

        if (editTabTranslateX.new < 0) return;
        setTouchX((prev) => ({ ...prev, end: clientX }));
      }}
      onTouchEnd={() => {
        setTouchX((prev) => ({ ...prev, isDragEnd: true }));
      }}
    >
      <div className="h-1/6 border-l-2 border-base-100 " />
      <div className="h-1/6 border-l-2 border-base-100" />
      {editTabTranslateX.new === EditTabWidth.current && (
        <button
          type="button"
          className={`absolute top-0 left-0 -translate-x-full text-base-100 text-sm font-bold py-1 px-2 rounded-tl-lg rounded-bl-lg
              ${step.step === "edit" ? "bg-secondary" : "bg-accent"}
          `}
          onClick={() => {
            setIsEditRequested(true);
            setEditTabTranslateX({ old: 0, new: 0 });
          }}
        >
          {step.step === "edit"
            ? "Edit"
            : `Message - ${editTabTranslateX.old} / ${editTabTranslateX.new}`}
        </button>
      )}
    </div>
  );
}
export default CloseSlider;
