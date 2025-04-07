import { Dispatch, SetStateAction } from "react";
import emojis from ".";

function Picker({
  setMessage,
}: {
  setMessage: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="w-full h-full flex flex-wrap gap-1 p-2">
      {emojis.map((emoji) => (
        <button
          type="button"
          className="grow"
          key={emoji.id}
          onClick={() => setMessage((prev) => prev + emoji.emoji)}
        >
          {emoji.emoji}
        </button>
      ))}
    </div>
  );
}
export default Picker;
