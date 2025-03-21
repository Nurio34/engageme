import { PlayerTimeType } from "../..";
import Controls from "./Controls";
import IndicatorPoints from "./IndicatorPoints";
import PosterImage from "./PosterImage";

function TrimVideo({
  url,
  posters,
  duration,
  asset_id,
  playerTime,
}: {
  url: string;
  posters: string[];
  duration: number | undefined;
  asset_id: string;
  playerTime: PlayerTimeType;
}) {
  return (
    <div>
      <h2 className="font-bold text-lg">Trim</h2>
      <div className="relative">
        <div
          className="flex h-16 rounded-lg overflow-hidden mt-2"
          style={{ boxShadow: "0 5px 15px -6px black" }}
        >
          {posters.map((poster) => (
            <PosterImage key={poster} poster={poster} />
          ))}
        </div>
        <Controls
          url={url}
          duration={duration}
          asset_id={asset_id}
          playerTime={playerTime}
        />
      </div>
      <IndicatorPoints duration={duration} />
    </div>
  );
}
export default TrimVideo;
