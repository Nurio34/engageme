import CoverPhoto from "./CoverPhoto";
import TrimVideo from "./TrimVideo";
import { useGetPosters } from "../hooks/useGetPosters";
import { PlayerTimeType } from "..";
import SoundConfig from "./SoundConfig";
import { MediaType } from "@/actions/cloudinary";

function EditTab({
  eagerUrl,
  url,
  duration,
  asset_id,
  playerTime,
  media,
}: {
  eagerUrl: string;
  url: string;
  duration: number | undefined;
  asset_id: string;
  playerTime: PlayerTimeType;
  media: MediaType;
}) {
  const posters = useGetPosters(duration, eagerUrl);

  return (
    <div className="grow p-4 wf">
      <CoverPhoto posters={posters} media={media} />
      <TrimVideo
        url={url}
        posters={posters}
        duration={duration}
        asset_id={asset_id}
        playerTime={playerTime}
      />
      <SoundConfig media={media} />
    </div>
  );
}
export default EditTab;
