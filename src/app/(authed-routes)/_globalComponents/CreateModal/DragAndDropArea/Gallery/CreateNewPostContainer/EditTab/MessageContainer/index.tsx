import { Dispatch, RefObject, SetStateAction } from "react";
import Message from "./Message";
import UserInfo from "./UserInfo";
import { EditTabTranslateXType } from "../../../EditContainer/Medias/MediaContainer/CloseSlider/useEditTabControl";

function MessageContainer({
  EditTabWidth,
  setEditTabTranslateX,
}: {
  EditTabWidth: RefObject<number>;
  setEditTabTranslateX: Dispatch<SetStateAction<EditTabTranslateXType>>;
}) {
  return (
    <div className="p-4 pb-2 space-y-4 border-b-2">
      <UserInfo
        setEditTabTranslateX={setEditTabTranslateX}
        EditTabWidth={EditTabWidth}
      />
      <Message EditTabWidth={EditTabWidth} />
    </div>
  );
}
export default MessageContainer;
