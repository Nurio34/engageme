import { PrismaMediaType } from "../../../../../../../../../prisma/types/post";
import ImageMedia from "../ImageMedia";
import VideoMedia from "../VideoMedia";

function MediasSlide({
  currentIndex,
  mediasContainerWidth,
  medias,
}: {
  currentIndex: number;
  mediasContainerWidth: number;
  medias: PrismaMediaType[];
}) {
  return (
    <div
      className="flex transition-transform"
      style={{
        transform: `translateX(${currentIndex * mediasContainerWidth * -1}px)`,
      }}
    >
      {medias.map((media, index) => {
        const { type } = media;

        return type === "image" ? (
          <ImageMedia key={media.id} media={media} />
        ) : (
          <VideoMedia
            key={media.id}
            media={media}
            index={index}
            currentIndex={currentIndex}
          />
        );
      })}
    </div>
  );
}
export default MediasSlide;
