import { MediaType } from "@/actions/cloudinary";
import { useCreateModalContext } from "@/app/(authed-routes)/_globalComponents/CreateModal/Context";
import Media from "./Media";
import EditTab from "./EditTab";

function VideoContainer({ index, media }: { index: number; media: MediaType }) {
  const { currentIndex } = useCreateModalContext();

  return (
    currentIndex === index && (
      <div className="flex h-full">
        <Media media={media} />
        <EditTab />
      </div>
    )
  );
}
export default VideoContainer;
