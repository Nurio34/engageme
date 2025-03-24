import { EditedMedia, useCreateModalContext } from "../../../../Context";
import Media from "./Media";
import EditTab from "./EditTab";

function MediaContainer({
  media,
  index,
}: {
  media: EditedMedia;
  index: number;
}) {
  const { currentIndex } = useCreateModalContext();

  return (
    currentIndex === index && (
      <div className="h-full md:flex">
        <Media media={media} />
        <EditTab />
      </div>
    )
  );
}
export default MediaContainer;
