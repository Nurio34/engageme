import { MediaType } from "@/actions/cloudinary";
import { useCreateModalContext } from "@/app/(authed-routes)/_globalComponents/CreateModal/Context";

function VideoContainer({ index, media }: { index: number; media: MediaType }) {
  console.log(media);
  const { currentIndex } = useCreateModalContext();

  return currentIndex === index && <div>VideoContainer</div>;
}
export default VideoContainer;
