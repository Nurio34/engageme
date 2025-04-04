import { PrismaPostType } from "../../../../../../../../prisma/types/post";
import ImageMedia from "./ImageMedia";
import VideoMedia from "./VideoMedia";

function Medias({ post }: { post: PrismaPostType }) {
  const { medias } = post;

  return (
    <div className="pt-2">
      {medias.map((media) => {
        const { type } = media;

        return type === "image" ? (
          <ImageMedia key={media.id} media={media} />
        ) : (
          <VideoMedia key={media.id} media={media} />
        );
      })}
    </div>
  );
}
export default Medias;
