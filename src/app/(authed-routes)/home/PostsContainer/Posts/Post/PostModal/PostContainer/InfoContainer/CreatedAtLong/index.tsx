import { fancyTime } from "@/utils/fancyTime";
import { useInfoContext } from "../Context";

function CreatedAtLong() {
  const { postsState } = useInfoContext();
  if (postsState.length <= 0) return;

  const { updatedAt } = postsState[0];

  return (
    <p className="text-base-content/70 text-xs">{fancyTime(updatedAt).long}</p>
  );
}
export default CreatedAtLong;
