import PosterImage from "./PosterImage";
import SelectFromComputerButton from "./SelectFromComputerButton";

function CoverPhoto({
  posters,
  asset_id,
}: {
  posters: string[];
  asset_id: string;
}) {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-lg">Cover Photo</h2>
        <SelectFromComputerButton asset_id={asset_id} />
      </div>
      <ul className="flex h-28 my-4">
        {posters.map((poster, index) => (
          <PosterImage
            key={poster}
            index={index}
            poster={poster}
            asset_id={asset_id}
          />
        ))}
      </ul>
    </div>
  );
}
export default CoverPhoto;
