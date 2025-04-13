import { PrismaMediaType } from "../../../../../../../../../prisma/types/post";
import ImageMedia from "../ImageMedia";
import VideoMedia from "../VideoMedia";

function MediasSlide({
  index,
  currentIndex,
  mediasContainerWidth,
  medias,
}: {
  index: number;
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
      {medias.map((media, ind) => {
        const { type } = media;

        return type === "image" ? (
          <ImageMedia key={media.id} index={index} media={media} />
        ) : (
          <VideoMedia
            key={media.id}
            media={media}
            index={ind}
            currentIndex={currentIndex}
          />
        );
      })}
    </div>
  );
}
export default MediasSlide;
