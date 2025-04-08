import { PrismaMediaType } from "../../../../../../../../../../prisma/types/post";

function SlideIndicator({
  medias,
  currentIndex,
}: {
  medias: PrismaMediaType[];
  currentIndex: number;
}) {
  return (
    medias.length > 1 && (
      <div
        className=" absolute bottom-2 left-1/2 -translate-x-1/2
    flex gap-1
  "
      >
        {medias.map((media, index) => (
          <span
            key={media.id}
            className={`block w-2 aspect-square rounded-full transition-all
        ${currentIndex === index ? "bg-base-100 scale-125" : "bg-base-300/70"}  
      `}
          />
        ))}
      </div>
    )
  );
}
export default SlideIndicator;
