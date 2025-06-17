import { fancyTime } from "@/utils/fancyTime";
import { useInfoContext } from "../../Context";

function CreatedAt() {
  const { postsState } = useInfoContext();
  if (postsState.length <= 0) return;

  const { updatedAt } = postsState[0];
  return (
    <p className="text-base-content/60 text-sm">{fancyTime(updatedAt).short}</p>
  );
}
export default CreatedAt;
