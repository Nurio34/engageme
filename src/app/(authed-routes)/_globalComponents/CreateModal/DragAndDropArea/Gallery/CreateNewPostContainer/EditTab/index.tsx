import { useEffect, useRef, useState } from "react";
import MessageContainer from "./MessageContainer";
import { useCreateModalContext } from "@/app/(authed-routes)/_globalComponents/CreateModal/Context";
import { useEditTabControl } from "../../EditContainer/Medias/MediaContainer/CloseSlider/useEditTabControl";
import CloseSlider from "../../EditContainer/Medias/MediaContainer/CloseSlider";
import Location from "./Location";
import AddCollaborators from "./AddCollaborators";
import Accesibility from "./Accesibility";
import AdvancedSettings from "./AdvancedSettings";

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

  const ContainerRef = useRef<HTMLDivElement | null>(null);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    if (ContainerRef.current)
      setContainerHeight(ContainerRef.current.getBoundingClientRect().height);
  }, []);

  return (
    <div
      ref={EditTabRef}
      className={`absolute md:relative right-0 top-0 bg-base-100 z-20 w-full h-full border-l flex flex-col
      ${
        isEditRequested && touchX.isDragEnd
          ? "transition-transform"
          : "transition-none"
      }  
    `}
      style={{
        width: "calc(100% - 64px)",
        transform: `translateX(${editTabTranslateX.new}px)`,
      }}
      onClick={() => {
        setIsEmojiPickerOpen(false);
        setIsPlacesModalOpen(false);
      }}
    >
      <div
        ref={ContainerRef}
        className="h-full overflow-auto"
        style={{
          maxHeight: containerHeight === 0 ? undefined : containerHeight,
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
        <AddCollaborators />
        <Accesibility />
        <AdvancedSettings />
      </div>
    </div>
  );
}
export default EditTab;
