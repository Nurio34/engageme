import { useCreateModalContext } from "../../../../Context";
import Media from "./Media";

function Medias() {
  const { baseCanvasContainerWidth, cloudinaryMedias } =
    useCreateModalContext();

  return (
    <div className="h-full" style={{ width: baseCanvasContainerWidth }}>
      {cloudinaryMedias.medias.map((media, index) => (
        <Media key={media.asset_id} index={index} media={media} />
      ))}
    </div>
  );
}
export default Medias;
