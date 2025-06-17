import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setPostModal } from "@/store/slices/homePage";
import { useEffect, useRef, useState } from "react";

export type PointerType = {
  start_x: number;
  start_y: number;
  isDragging: boolean;
  end_x: number;
  end_y: number;
};

const initialPointer = {
  start_x: 0,
  start_y: 0,
  isDragging: false,
  end_x: 0,
  end_y: 0,
};

const initialTranslate = { x: 0, y: 0 };

export const useDragAndFade = () => {
  const { device } = useAppSelector((s) => s.modals);
  const { width, height } = device;

  const dispatch = useAppDispatch();

  const [pointer, setPointer] = useState<PointerType>(initialPointer);
  const [translate, setTranslate] = useState(initialTranslate);
  const [isFading, setIsFading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setTranslate({
      x: pointer.end_x - pointer.start_x,
      y: pointer.end_y - pointer.start_y,
    });
  }, [pointer]);

  useEffect(() => {
    if (translate.x === width || translate.y === height) return;
    if (translate.x === 0 && translate.y === 0) return;

    if (!pointer.isDragging) {
      if (translate.x > width / 4) {
        setIsFading(true);
        setTranslate((prev) => ({ ...prev, x: width }));
        return;
      } else if (translate.y > height / 4) {
        setIsFading(true);
        setTranslate((prev) => ({ ...prev, y: height }));
        return;
      } else if (translate.y < height / -4) {
        setIsFading(true);
        setTranslate((prev) => ({ ...prev, y: height * -1 }));
        return;
      } else if (translate.x < width / -4) {
        setIsFading(true);
        setTranslate((prev) => ({ ...prev, x: width * -1 }));
        return;
      } else {
        setTranslate(initialTranslate);
        setPointer(initialPointer);
        return;
      }
    }
  }, [translate, pointer.isDragging]);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (isFading)
      timeoutRef.current = setTimeout(() => {
        dispatch(setPostModal({ postId: "", isOpen: false }));
        setPointer(initialPointer);
        setTranslate(initialTranslate);
        setIsFading(false);
        history.back();
      }, 300);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isFading]);

  return {
    isDragging: pointer.isDragging,
    x: translate.x,
    y: translate.y,
    isFading,
    setPointer,
  };
};
