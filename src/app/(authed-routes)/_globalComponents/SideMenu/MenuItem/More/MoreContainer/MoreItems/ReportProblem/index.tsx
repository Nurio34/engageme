import ReportIcon from "@/app/_globalComponents/Svg/MoreSvgs/ReportIcon";

function ReportProblem() {
  return (
    <button
      type="button"
      className={`w-full flex gap-x-2 items-center min-w-max text-sm py-4 px-3 rounded-lg transition-colors 
        hover:bg-base-300
        `}
    >
      <ReportIcon />
      Report Problem
    </button>
  );
}
export default ReportProblem;
