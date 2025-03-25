import { RefObject } from "react";
import EmojiContainer from "./EmojiContainer";
import TextArea from "./TextArea";

function Message({ EditTabWidth }: { EditTabWidth: RefObject<number> }) {
  return (
    <div className="space-y-4">
      <TextArea />
      <EmojiContainer EditTabWidth={EditTabWidth} />
    </div>
  );
}
export default Message;
