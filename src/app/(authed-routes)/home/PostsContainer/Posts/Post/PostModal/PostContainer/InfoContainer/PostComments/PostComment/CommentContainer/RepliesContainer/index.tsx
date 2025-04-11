import Loading from "@/app/_globalComponents/LoadingComponents/Loading";
import ViewButton from "./ViewButton";
import TotalReplies from "./TotalReplies";

function RepliesContainer() {
  return (
    <div className="pt-4 flex items-center gap-x-1">
      <ViewButton />
      <TotalReplies />
      <div className="ml-2">
        <Loading size={5} />
      </div>
    </div>
  );
}
export default RepliesContainer;
