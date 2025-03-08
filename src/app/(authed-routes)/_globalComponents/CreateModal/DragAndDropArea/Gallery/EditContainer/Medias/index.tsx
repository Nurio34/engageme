import { useCreateModalContext } from "../../../../Context";
import MediaContainer from "./MediaContainer";

function Medias() {
  const { cloudinaryMedias } = useCreateModalContext();

  return (
    <div className="h-full">
      {cloudinaryMedias.medias.map((media, index) => (
        <MediaContainer key={media.asset_id} index={index} media={media} />
      ))}
    </div>
  );
}
export default Medias;
