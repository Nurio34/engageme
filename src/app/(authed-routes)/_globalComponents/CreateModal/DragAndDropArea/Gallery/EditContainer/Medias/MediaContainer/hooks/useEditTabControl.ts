import { RefObject, useEffect, useRef, useState } from "react";

export type EditTabTranslateXType = {
  old: number;
  new: number;
};

export type TouchXType = { start: number; end: number; isDragEnd: boolean };

export const useEditTabControl = (
  EditTabRef: RefObject<HTMLDivElement | null>,
  isEditRequested: boolean
) => {
  const EditTabWidth = useRef(0);
  const [editTabTranslateX, setEditTabTranslateX] =
    useState<EditTabTranslateXType>({
      old: EditTabWidth.current,
      new: EditTabWidth.current,
    });
  const [touchX, setTouchX] = useState<TouchXType>({
    start: 0,
    end: 0,
    isDragEnd: true,
  });

  useEffect(() => {
    const handleEditTabWidth = () => {
      if (EditTabRef.current) {
        const width = EditTabRef.current.getBoundingClientRect().width;
        EditTabWidth.current = width + 28;
        setEditTabTranslateX({ old: width + 28, new: width + 28 });
      }
    };

    handleEditTabWidth();

    window.addEventListener("resize", handleEditTabWidth);

    return () => {
      window.addEventListener("resize", handleEditTabWidth);
    };
  }, []);

  useEffect(() => {
    const { start, end, isDragEnd } = touchX;
    const diff = end - start;
    if (!isDragEnd) {
      setEditTabTranslateX((prev) => ({ ...prev, new: prev.old + diff }));
    } else {
      if (editTabTranslateX.new > EditTabWidth.current / 2) {
        setEditTabTranslateX({
          old: EditTabWidth.current,
          new: EditTabWidth.current,
        });
      } else {
        if (!isEditRequested) return;

        setEditTabTranslateX({
          old: 0,
          new: 0,
        });
      }
    }
  }, [touchX]);

  useEffect(() => {
    const handleResize = () => {
      const innerWidth = window.innerWidth;
      if (innerWidth > 768) {
        setEditTabTranslateX({ old: 0, new: 0 });
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    editTabTranslateX,
    setEditTabTranslateX,
    EditTabWidth,
    touchX,
    setTouchX,
  };
};
