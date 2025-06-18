import { PrismaMediaType } from "../../../../../../../../../../../prisma/types/post";
import ImageMedia from "./ImageMedia";
import VideoMedia from "./VideoMedia";

function Media({
  index,
  media,
  divWidth,
}: {
  index: number;
  media: PrismaMediaType;
  divWidth: number;
}) {
  const { type } = media;

  return type === "image" ? (
    <ImageMedia index={index} media={media} divWidth={divWidth} />
  ) : (
    <VideoMedia index={index} media={media} divWidth={divWidth} />
  );
}
export default Media;
