import { MediaType } from "@/actions/cloudinary";
import { useCreateModalContext } from "@/app/(authed-routes)/_globalComponents/CreateModal/Context";
import Media from "./Media";
import EditTab from "./EditTab";

function VideoContainer({ index, media }: { index: number; media: MediaType }) {
  const { currentIndex } = useCreateModalContext();

  const { eager, url, duration, poster, asset_id } = media;
  const eagerUrl = eager![0].url;

  return (
    currentIndex === index && (
      <div className="flex h-full">
        <Media
          eagerUrl={eagerUrl}
          url={url}
          poster={poster}
          asset_id={asset_id}
        />
        <EditTab
          eagerUrl={eagerUrl}
          url={url}
          duration={duration}
          asset_id={asset_id}
        />
      </div>
    )
  );
}
export default VideoContainer;
