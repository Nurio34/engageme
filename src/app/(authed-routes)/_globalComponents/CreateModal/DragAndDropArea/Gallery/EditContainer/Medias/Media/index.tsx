import { MediaType } from "@/actions/cloudinary";
import ImageContainer from "./ImageContainer";
import VideoContainer from "./VideoContainer";

function Media({ index, media }: { index: number; media: MediaType }) {
  const { resource_type } = media;

  return resource_type === "image" ? (
    <ImageContainer index={index} media={media} />
  ) : (
    <VideoContainer index={index} media={media} />
  );
}
export default Media;
