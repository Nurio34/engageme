import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PrismaMediaType } from "../../../../../../../../../../prisma/types/post";

export type Pointer = {
  start_x: number;
  isDragging: boolean;
  end_x: number;
};

export const useSlide = (
  currentIndex: number,
  medias: PrismaMediaType[],
  mediasContainerWidth: number,
  setCurrentIndex: Dispatch<SetStateAction<number>>
) => {
  const [pointer, setPointer] = useState({
    start_x: 0,
    isDragging: false,
    end_x: 0,
  });
  const { start_x, isDragging, end_x } = pointer;

  useEffect(() => {
    if (
      isDragging &&
      currentIndex === medias.length - 1 &&
      start_x - end_x > mediasContainerWidth / 4
    )
      setPointer((prev) => ({ ...prev, isDragging: false }));

    if (
      isDragging &&
      currentIndex === 0 &&
      start_x - end_x < mediasContainerWidth / -4
    )
      setPointer((prev) => ({ ...prev, isDragging: false }));

    if (isDragging) return;

    if (currentIndex > 0 && start_x - end_x < mediasContainerWidth / -4)
      setCurrentIndex((prev) => prev - 1);

    if (
      currentIndex < medias.length - 1 &&
      start_x - end_x > mediasContainerWidth / 4
    )
      setCurrentIndex((prev) => prev + 1);
  }, [pointer]);

  return { pointer, setPointer };
};
