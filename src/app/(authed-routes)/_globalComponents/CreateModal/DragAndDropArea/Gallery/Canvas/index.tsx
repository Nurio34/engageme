import { useEffect, useRef, useState } from "react";
import { useCreateModalContext } from "../../../Context";

export type ResizingType = {
  isStarted: boolean;
  X_Start: number;
  X_End: number;
  Y_Start: number;
  Y_End: number;
};

export type PositionType = {
  new_X: number;
  old_X: number;
  new_Y: number;
  old_Y: number;
};
export type ImageSizeType = { width: number; height: number };

function Canvas({ url, index }: { url: string; index: number }) {
  //!TODO : Ikıncı DragAndDrop aksiyonunda, sonradan eklenen resimlerin x ve y posizyonları nerdeyse kendi w ve h'leri kadr olmuş oluyo

  const { canvasContainerSize, currentIndex, setIsResizingStarted } =
    useCreateModalContext();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [imageSize, setImageSize] = useState<ImageSizeType>({
    width: 0,
    height: 0,
  });
  //! *** handle resizeing the image ***
  const [resizing, setResizing] = useState<ResizingType>({
    isStarted: false,
    X_Start: 0,
    X_End: 0,
    Y_Start: 0,
    Y_End: 0,
  });

  const [position, setPosition] = useState<PositionType>({
    new_X: 0,
    old_X: 0,
    new_Y: 0,
    old_Y: 0,
  });
  //! **********************************

  // Update position based on resizing state
  useEffect(() => {
    if (!resizing.isStarted) {
      setIsResizingStarted(false);
      setPosition((prev) => ({
        old_X: prev.new_X + prev.old_X,
        old_Y: prev.new_Y + prev.old_Y,
        new_X: 0,
        new_Y: 0,
      }));

      const x = position.new_X + position.old_X;
      const w = imageSize.width;

      if (w + x < canvasContainerSize.width) {
        setPosition((prev) => ({
          ...prev,
          new_X: 0,
          old_X: canvasContainerSize.width - w,
        }));
      }
      if (x > 0) {
        setPosition((prev) => ({
          ...prev,
          new_X: 0,
          old_X: 0,
        }));
      }

      const y = position.new_Y + position.old_Y;
      const h = imageSize.height;

      if (h + y < canvasContainerSize.height) {
        setPosition((prev) => ({
          ...prev,
          new_Y: 0,
          old_Y: canvasContainerSize.height - h,
        }));
      }

      if (y > 0) {
        setPosition((prev) => ({
          ...prev,
          new_Y: 0,
          old_Y: 0,
        }));
      }
    } else {
      setPosition((prev) => ({
        ...prev,
        new_X: resizing.X_End - resizing.X_Start,
        new_Y: resizing.Y_End - resizing.Y_Start,
      }));
      setIsResizingStarted(true);
    }
  }, [resizing, setPosition]);

  // Load the image once when url changes
  useEffect(() => {
    const image = new Image();
    image.src = url;
    image.onload = () => {
      imageRef.current = image;
      const ratio = image.naturalWidth / image.naturalHeight;
      let width, height;
      if (ratio <= 1) {
        width =
          imageSize.width < canvasContainerSize.width
            ? canvasContainerSize.width
            : canvasContainerSize.width;
        height = width / ratio;
      } else {
        height =
          imageSize.height < canvasContainerSize.height
            ? canvasContainerSize.height
            : canvasContainerSize.height;
        width = height * ratio;
      }

      setImageSize({ width, height });
      redraw();
    };
  }, [url, canvasContainerSize]);

  // Set canvas size when canvasContainerSize changes
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = canvasContainerSize.width;
      canvas.height = canvasContainerSize.height;
      redraw();
    }
  }, [canvasContainerSize, imageSize]);

  // Redraw when position changes
  useEffect(() => {
    redraw();
  }, [position, imageSize]);

  // Drawing function using requestAnimationFrame
  const redraw = () => {
    if (canvasRef.current && imageRef.current && imageSize.width > 0) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        requestAnimationFrame(() => {
          ctx.clearRect(
            0,
            0,
            canvasRef.current!.width,
            canvasRef.current!.height
          );
          ctx.drawImage(
            imageRef.current!,
            position.old_X + position.new_X,
            position.old_Y + position.new_Y,
            imageSize.width,
            imageSize.height
          );
        });
      }
    }
  };

  return (
    <canvas
      ref={canvasRef}
      className={`absolute top-0 left-0
        ${currentIndex === index ? "block" : "hidden"}
        ${resizing.isStarted ? "cursor-grabbing" : "cursor-grab"}
      `}
      onMouseDown={(e) => {
        setResizing((prev) => ({
          ...prev,
          isStarted: true,
          X_Start: e.clientX,
          X_End: e.clientX,
          Y_Start: e.clientY,
          Y_End: e.clientY,
        }));
      }}
      onMouseMove={(e) => {
        if (resizing.isStarted)
          setResizing((prev) => ({
            ...prev,
            X_End: e.clientX,
            Y_End: e.clientY,
          }));
      }}
      onMouseUp={() => {
        setResizing((prev) => ({ ...prev, isStarted: false }));
      }}
      onTouchStart={(e) => {
        e.preventDefault();
        const touch = e.touches[0];
        setResizing((prev) => ({
          ...prev,
          isStarted: true,
          X_Start: touch.clientX,
          X_End: touch.clientX,
          Y_Start: touch.clientY,
          Y_End: touch.clientY,
        }));
      }}
      onTouchMove={(e) => {
        e.preventDefault();
        if (resizing.isStarted) {
          const touch = e.touches[0];
          setResizing((prev) => ({
            ...prev,
            X_End: touch.clientX,
            Y_End: touch.clientY,
          }));
        }
      }}
      onTouchEnd={(e) => {
        e.preventDefault();
        setResizing((prev) => ({ ...prev, isStarted: false }));
      }}
    />
  );
}

export default Canvas;
