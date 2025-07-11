import ReportIcon from "@/app/_globalComponents/Svg/MoreSvgs/ReportIcon";
import toast from "react-hot-toast";
import { FaCircleInfo } from "react-icons/fa6";

function ReportProblem() {
  return (
    <button
      type="button"
      className={`w-full flex gap-x-2 items-center min-w-max text-sm py-4 px-3 rounded-lg transition-colors 
        hover:bg-base-300
        `}
      onClick={(e) => {
        e.stopPropagation();
        toast("This feature is under development !", {
          className: "text-center",
          icon: <FaCircleInfo className="text-4xl text-info" />,
        });
      }}
    >
      <ReportIcon />
      Report Problem
    </button>
  );
}
export default ReportProblem;
