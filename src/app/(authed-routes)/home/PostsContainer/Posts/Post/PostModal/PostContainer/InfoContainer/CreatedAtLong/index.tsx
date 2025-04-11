import { fancyTime } from "@/utils/fancyTime";

function CreatedAtLong({ updatedAt }: { updatedAt: Date }) {
  return (
    <p className="text-base-content/70 text-sm">{fancyTime(updatedAt).long}</p>
  );
}
export default CreatedAtLong;
