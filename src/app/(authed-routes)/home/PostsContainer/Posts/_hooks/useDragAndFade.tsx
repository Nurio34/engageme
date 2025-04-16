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
  const { type, width, height } = device;
  const isDesktop = type === "desktop";

  const dispatch = useAppDispatch();

  const [pointer, setPointer] = useState<PointerType>(initialPointer);
  const [translate, setTranslate] = useState(initialTranslate);
  const [isFading, setIsFading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isDesktop) return;
    setTranslate({
      x: pointer.end_x - pointer.start_x,
      y: pointer.end_y - pointer.start_y,
    });
  }, [pointer]);

  useEffect(() => {
    if (isDesktop) return;
    if (translate.x === width || translate.y === height) return;
    if (translate.x === 0 && translate.y === 0) return;

    if (!pointer.isDragging) {
      if (translate.x > width / 2) {
        setIsFading(true);
        setTranslate((prev) => ({ ...prev, x: width }));
      } else if (translate.x < (width / 2) * -1) {
        setIsFading(true);
        setTranslate((prev) => ({ ...prev, x: width * -1 }));
      } else if (translate.y > height / 2) {
        setIsFading(true);
        setTranslate((prev) => ({ ...prev, y: height }));
      } else if (translate.y < (height / 2) * -1) {
        setIsFading(true);
        setTranslate((prev) => ({ ...prev, y: height * -1 }));
      } else {
        setTranslate({ x: 0, y: 0 });
      }
    }
  }, [translate, pointer.isDragging]);

  useEffect(() => {
    if (isDesktop) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (isFading)
      timeoutRef.current = setTimeout(() => {
        dispatch(setPostModal({ postId: "", isOpen: false }));
        setPointer(initialPointer);
        setTranslate(initialTranslate);
        setIsFading(false);
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
