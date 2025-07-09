import { PrismaMediaType } from "../../../../../../../../../../../prisma/types/post";
import ImageMedia from "./ImageMedia";
import VideoMedia from "./VideoMedia";

function Media({ index, media }: { index: number; media: PrismaMediaType }) {
  const { type } = media;

  return type === "image" ? (
    <ImageMedia media={media} index={index} />
  ) : (
    <VideoMedia index={index} media={media} />
  );
}
export default Media;
