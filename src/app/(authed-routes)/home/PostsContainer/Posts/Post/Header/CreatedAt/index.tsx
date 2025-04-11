import { fancyTime } from "@/utils/fancyTime";

function CreatedAt({ updatedAt }: { updatedAt: Date }) {
  return (
    <p className="text-base-content/60 text-sm">{fancyTime(updatedAt).short}</p>
  );
}
export default CreatedAt;
