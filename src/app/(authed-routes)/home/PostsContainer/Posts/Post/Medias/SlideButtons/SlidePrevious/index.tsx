import { Dispatch, SetStateAction } from "react";
import { PrismaMediaType } from "../../../../../../../../../../prisma/types/post";
import Chevron from "@/app/_globalComponents/Svg/Chevron";

function SlidePrevious({
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
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-base-100 text-base-content w-8 aspect-square rounded-full flex items-center justify-center"
        onClick={() =>
          setCurrentIndex((prev) => {
            if (prev === 0) return medias.length - 1;
            else return prev - 1;
          })
        }
      >
        <Chevron rotate={270} />
      </button>
    )
  );
}
export default SlidePrevious;
