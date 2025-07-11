import ShareIcon from "@/app/_globalComponents/Svg/ShareIcon";
import toast from "react-hot-toast";
import { FaCircleInfo } from "react-icons/fa6";

function ShareButton() {
  return (
    <button
      type="button"
      className="transition-colors hover:text-base-content/50"
      onClick={(e) => {
        e.stopPropagation();
        toast("This feature is under development !", {
          className: "text-center",
          icon: <FaCircleInfo className="text-4xl text-info" />,
        });
      }}
    >
      <ShareIcon />
    </button>
  );
}
export default ShareButton;
