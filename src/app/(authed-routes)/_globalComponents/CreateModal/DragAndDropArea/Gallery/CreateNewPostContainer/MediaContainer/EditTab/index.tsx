import { useEffect, useRef, useState } from "react";
import MessageContainer from "./MessageContainer";
import { useCreateModalContext } from "@/app/(authed-routes)/_globalComponents/CreateModal/Context";
import Location from "./Location";
import { useEditTabControl } from "../../../EditContainer/Medias/MediaContainer/CloseSlider/useEditTabControl";
import CloseSlider from "../../../EditContainer/Medias/MediaContainer/CloseSlider";

function EditTab() {
  const { setIsEmojiPickerOpen, setIsPlacesModalOpen } =
    useCreateModalContext();

  const EditTabRef = useRef<HTMLDivElement | null>(null);
  const [isEditRequested, setIsEditRequested] = useState(false);

  const {
    editTabTranslateX,
    setEditTabTranslateX,
    EditTabWidth,
    touchX,
    setTouchX,
  } = useEditTabControl(EditTabRef, isEditRequested);
  console.log({ editTabTranslateX, EditTabWidth });
  return (
    <div
      ref={EditTabRef}
      className={`absolute right-0 top-0 p-2 bg-base-100 z-20 md:relative h-full md:grow border-l flex flex-col
        ${touchX.isDragEnd ? "transition-transform" : "transition-none"}  
      `}
      style={{
        // width: "calc(100% - 64px)",
        transform: `translateX(${editTabTranslateX.new}px)`,
      }}
      onClick={() => {
        setIsEmojiPickerOpen(false);
        setIsPlacesModalOpen(false);
      }}
    >
      <CloseSlider
        editTabTranslateX={editTabTranslateX}
        setEditTabTranslateX={setEditTabTranslateX}
        EditTabWidth={EditTabWidth}
        setTouchX={setTouchX}
        setIsEditRequested={setIsEditRequested}
      />
      <MessageContainer
        EditTabWidth={EditTabWidth}
        setEditTabTranslateX={setEditTabTranslateX}
      />
      <Location EditTabWidth={EditTabWidth} />
    </div>
  );
}
export default EditTab;
