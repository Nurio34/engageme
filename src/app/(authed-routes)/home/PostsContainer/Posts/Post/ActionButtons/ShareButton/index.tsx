import ShareIcon from "@/app/_globalComponents/Svg/ShareIcon";

function ShareButton() {
  return (
    <button
      type="button"
      className="transition-colors hover:text-base-content/50"
    >
      <ShareIcon />
    </button>
  );
}
export default ShareButton;
