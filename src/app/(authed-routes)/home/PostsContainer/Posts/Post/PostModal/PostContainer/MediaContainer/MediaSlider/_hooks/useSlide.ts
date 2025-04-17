import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PrismaMediaType } from "../../../../../../../../../../../../prisma/types/post";

export const useSlide = (
  currentIndex: number,
  medias: PrismaMediaType[],
  containerWidth: number,
  setCurrentIndex: Dispatch<SetStateAction<number>>
) => {
  const [slideArray, setSlideArray] = useState<number[]>([]);
  const [slide, setSlide] = useState(0);

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
      start_x - end_x > containerWidth / 4
    )
      setPointer((prev) => ({ ...prev, isDragging: false }));

    if (
      isDragging &&
      currentIndex === 0 &&
      start_x - end_x < containerWidth / -4
    )
      setPointer((prev) => ({ ...prev, isDragging: false }));

    if (isDragging) return;

    if (currentIndex > 0 && start_x - end_x < containerWidth / -4)
      setCurrentIndex((prev) => prev - 1);

    if (
      currentIndex < medias.length - 1 &&
      start_x - end_x > containerWidth / 4
    )
      setCurrentIndex((prev) => prev + 1);
  }, [pointer]);

  useEffect(() => {
    const slideAmount = slideArray.reduce((sum, amount, ind) => {
      if (currentIndex > ind) sum = sum + amount;
      return sum;
    }, 0);
    setSlide(slideAmount);
  }, [currentIndex, slideArray]);

  return { isDragging, slide, pointer, setPointer, setSlideArray };
};
