import CoverPhoto from "./CoverPhoto";
import TrimVideo from "./TrimVideo";
import { useGetPosters } from "../hooks/useGetPosters";

function EditTab({
  eagerUrl,
  url,
  duration,
  asset_id,
}: {
  eagerUrl: string;
  url: string;
  duration: number | undefined;
  asset_id: string;
}) {
  const posters = useGetPosters(duration, eagerUrl);

  return (
    <div className="grow p-4 wf">
      <CoverPhoto posters={posters} asset_id={asset_id} />
      <TrimVideo
        url={url}
        posters={posters}
        duration={duration}
        asset_id={asset_id}
      />
    </div>
  );
}
export default EditTab;
