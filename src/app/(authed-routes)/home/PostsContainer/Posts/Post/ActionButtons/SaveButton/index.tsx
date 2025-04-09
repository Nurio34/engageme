import SaveIcon from "@/app/_globalComponents/Svg/SaveIcon";

function SaveButton() {
  return (
    <button
      type="button"
      className="transition-colors hover:text-base-content/50"
    >
      <SaveIcon />
    </button>
  );
}
export default SaveButton;
