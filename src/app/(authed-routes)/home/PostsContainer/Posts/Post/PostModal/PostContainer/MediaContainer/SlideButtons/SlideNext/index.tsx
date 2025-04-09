import Chevron from "@/app/_globalComponents/Svg/Chevron";
import { Dispatch, SetStateAction } from "react";
import { PrismaMediaType } from "../../../../../../../../../../../../prisma/types/post";

function SlideNext({
  setCurrentIndex,
  medias,
}: {
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  medias: PrismaMediaType[];
}) {
  return (
    medias.length > 1 && (
      <button
        type="button"
        className="absolute top-1/2 right-2 -translate-y-1/2  bg-base-100 text-base-content w-8 aspect-square rounded-full flex items-center justify-center"
        onClick={() => setCurrentIndex((prev) => (prev + 1) % medias.length)}
      >
        <Chevron rotate={90} />
      </button>
    )
  );
}
export default SlideNext;
