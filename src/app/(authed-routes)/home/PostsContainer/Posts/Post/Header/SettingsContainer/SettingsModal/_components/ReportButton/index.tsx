import toast from "react-hot-toast";
import { FaCircleInfo } from "react-icons/fa6";

function ReportButton() {
  return (
    <li className="py-1 h-12 text-error font-bold border-b">
      <button
        type="button"
        className="w-full h-full flex justify-center items-center"
        onClick={(e) => {
          e.stopPropagation();
          toast("This feature is under development !", {
            className: "text-center",
            icon: <FaCircleInfo className="text-4xl text-info" />,
          });
        }}
      >
        Report
      </button>
    </li>
  );
}
export default ReportButton;
