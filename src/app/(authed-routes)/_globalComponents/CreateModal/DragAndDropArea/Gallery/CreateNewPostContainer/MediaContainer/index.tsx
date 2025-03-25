import { EditedMedia, useCreateModalContext } from "../../../../Context";
import Media from "./Media";

function MediaContainer({
  media,
  index,
}: {
  media: EditedMedia;
  index: number;
}) {
  const { currentIndex } = useCreateModalContext();

  return currentIndex === index && <Media media={media} />;
}
export default MediaContainer;
