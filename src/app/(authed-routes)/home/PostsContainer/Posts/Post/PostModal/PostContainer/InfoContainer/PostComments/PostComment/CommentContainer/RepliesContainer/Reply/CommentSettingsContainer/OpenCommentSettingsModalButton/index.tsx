import { Dispatch, SetStateAction } from "react";
import { BsThreeDots } from "react-icons/bs";

function OpenCommentSettingsModalButton({
  setIsCommentSettingsModalOpen,
}: {
  setIsCommentSettingsModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <button type="button" onClick={() => setIsCommentSettingsModalOpen(true)}>
      <BsThreeDots />
    </button>
  );
}
export default OpenCommentSettingsModalButton;
