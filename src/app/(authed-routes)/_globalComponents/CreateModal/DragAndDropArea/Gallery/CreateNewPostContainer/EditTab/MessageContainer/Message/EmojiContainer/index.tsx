import MessageCharacterIndicator from "./MessageCharacterIndicator";
import EmojiPickerContainer from "./EmojiPickerContainer";
import { RefObject } from "react";

function EmojiContainer({ EditTabWidth }: { EditTabWidth: RefObject<number> }) {
  return (
    <div className="flex items-center justify-between">
      <EmojiPickerContainer EditTabWidth={EditTabWidth} />
      <MessageCharacterIndicator />
    </div>
  );
}
export default EmojiContainer;
