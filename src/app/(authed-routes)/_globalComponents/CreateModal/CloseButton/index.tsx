import { VscClose } from "react-icons/vsc";

function CloseButton() {
  return (
    <button type="button" className="absolute top-7 right-7 btn btn-ghost">
      <VscClose size={28} className="text-base-100" />
    </button>
  );
}
export default CloseButton;
