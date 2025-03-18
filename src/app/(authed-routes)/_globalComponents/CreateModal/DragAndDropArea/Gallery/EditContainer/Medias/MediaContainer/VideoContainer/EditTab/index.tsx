import CoverPhoto from "./CoverPhoto";
import TrimVideo from "./TrimVideo";
import { useGetPosters } from "../hooks/useGetPosters";

function EditTab({
  eagerUrl,
  duration,
  asset_id,
}: {
  eagerUrl: string;
  duration: number | undefined;
  asset_id: string;
}) {
  const posters = useGetPosters(duration, eagerUrl);

  return (
    <div className="grow p-4 wf">
      <CoverPhoto posters={posters} asset_id={asset_id} />
      <TrimVideo posters={posters} duration={duration} />
    </div>
  );
}
export default EditTab;
