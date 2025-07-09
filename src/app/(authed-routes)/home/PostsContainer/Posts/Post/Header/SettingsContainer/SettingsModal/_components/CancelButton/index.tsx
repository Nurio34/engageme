import { Dispatch, SetStateAction } from "react";

function CancelButton({
  setIsRender,
  setIsModelOpen,
}: {
  setIsRender: Dispatch<SetStateAction<boolean>>;
  setIsModelOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <li className="py-1 h-12">
      <button
        type="button"
        className="w-full h-full flex justify-center items-center"
        onClick={() => {
          setIsRender(false);
          setIsModelOpen(false);
        }}
      >
        Cancel
      </button>
    </li>
  );
}
export default CancelButton;
