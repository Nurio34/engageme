import Controls from "./Controls";
import IndicatorPoints from "./IndicatorPoints";
import PosterImage from "./PosterImage";

function TrimVideo({
  posters,
  duration,
}: {
  posters: string[];
  duration: number | undefined;
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
        <Controls />
      </div>
      <IndicatorPoints duration={duration} />
    </div>
  );
}
export default TrimVideo;
