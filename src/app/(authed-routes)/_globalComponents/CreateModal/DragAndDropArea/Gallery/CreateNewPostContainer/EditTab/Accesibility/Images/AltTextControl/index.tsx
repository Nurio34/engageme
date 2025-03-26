import { Dispatch, SetStateAction } from "react";

function AltTextControl({
  altText,
  setAltText,
}: {
  altText: string;
  setAltText: Dispatch<SetStateAction<string>>;
}) {
  return (
    <input
      type="text"
      placeholder="Write alt text .."
      className="grow input input-bordered"
      autoComplete="off"
      value={altText}
      onChange={(e) => setAltText(e.target.value)}
    />
  );
}
export default AltTextControl;
