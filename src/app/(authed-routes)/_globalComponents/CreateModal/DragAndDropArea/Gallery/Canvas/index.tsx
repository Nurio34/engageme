import { useEffect, useRef, useState } from "react";
import { useCreateModalContext } from "../../../Context";
import Actions from "./Actions";

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

export type MediaSizeType = { width: number; height: number };

export type ActionType = "crop" | "zoom" | "list" | null;

function Canvas({ url, index }: { url: string; index: number }) {
  const { canvasContainerSize, currentIndex, setIsResizingStarted, files } =
    useCreateModalContext();
  const file = files.files![index];

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mediaRef = useRef<HTMLImageElement | HTMLVideoElement | null>(null);
  const [mediaSize, setMediaSize] = useState<MediaSizeType>({
    width: 0,
    height: 0,
  });
  const [isVideo, setIsVideo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

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

  //! *** Actions States ***
  const [ratioState, setRatioState] = useState(0);
  const [scale, setScale] = useState(1);
  //! **********************

  //! *** Set canvas size when canvasContainerSize changes ***
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = canvasContainerSize.width;
      canvas.height = canvasContainerSize.height;
      //? redraw();
    }
  }, [canvasContainerSize]);
  //! **********************************************************

  //! *** Load the image once when url changes ***
  useEffect(() => {
    const typeOfMedia = file.type.split("/")[0];

    if (typeOfMedia === "image") {
      const image = new Image();
      image.src = url;
      image.onload = () => {
        mediaRef.current = image;
        const originalRatio = image.naturalWidth / image.naturalHeight;

        let width, height, ratio;

        if (ratioState === 0) {
          ratio = originalRatio;
        } else {
          ratio = ratioState;
        }

        if (ratio <= 1) {
          if (originalRatio <= 1) {
            width = canvasContainerSize.width;
            height = width / ratio;
          } else {
            height = canvasContainerSize.height;
            width = height * ratio;
          }
        } else {
          if (originalRatio <= 1) {
            width = canvasContainerSize.width;
            height = width / ratio;
          } else {
            height = canvasContainerSize.height;
            width = height * ratio;
          }
        }

        setMediaSize({ width, height });
      };
    } else {
      if (!isVideo) {
        setIsVideo(true);
      } else {
        const video = document.createElement("video");
        video.src = url;
        video.onloadedmetadata = () => {
          mediaRef.current = video;
          const originalRatio = video.videoWidth / video.videoHeight;

          let width, height, ratio;

          if (ratioState === 0) {
            ratio = originalRatio;
          } else {
            ratio = ratioState;
          }

          if (ratio <= 1) {
            if (originalRatio <= 1) {
              width = canvasContainerSize.width;
              height = width / ratio;
            } else {
              height = canvasContainerSize.height;
              width = height * ratio;
            }
          } else {
            if (originalRatio <= 1) {
              width = canvasContainerSize.width;
              height = width / ratio;
            } else {
              height = canvasContainerSize.height;
              width = height * ratio;
            }
          }

          setMediaSize({ width, height });
          video.play();
        };
        video.onplay = () => setIsPlaying(true);
        video.onpause = () => setIsPlaying(false);
        video.onended = () => setIsPlaying(false);
      }
    }
    return () => {
      if (mediaRef.current instanceof HTMLVideoElement) {
        mediaRef.current.pause();
      }
    };
  }, [url, canvasContainerSize, currentIndex, isVideo, ratioState]);
  //! ************************************************

  //! *** Redraw when position changes ***
  useEffect(() => {
    if (!isVideo || !isPlaying) {
      redraw();
    }
  }, [position, mediaSize, isVideo, isPlaying, scale]);
  //! ***********************************

  //! *** Redraw when position changes ***
  useEffect(() => {
    let animationFrameId: number;
    const loop = () => {
      redraw();
      animationFrameId = requestAnimationFrame(loop);
    };

    if (isVideo && isPlaying) {
      animationFrameId = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVideo, isPlaying, position, mediaSize]);
  //! **************************

  //! *** Drawing function using requestAnimationFrame ***
  const redraw = () => {
    if (canvasRef.current && mediaRef.current && mediaSize.width > 0) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.clearRect(
          0,
          0,
          canvasRef.current!.width,
          canvasRef.current!.height
        );
        ctx.drawImage(
          mediaRef.current!,
          position.old_X + position.new_X,
          position.old_Y + position.new_Y,
          mediaSize.width * scale,
          mediaSize.height * scale
        );
      }
    }
  };
  //! *******************************************

  //! *** Update position based on resizing state ***
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
      const w = mediaSize.width * scale;

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
      const h = mediaSize.height * scale;

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
  }, [resizing, setPosition, mediaSize, url, scale]);
  //! ***********************************************

  return (
    <div className={`${currentIndex === index ? "block" : "hidden"}`}>
      <canvas
        ref={canvasRef}
        className={`absolute top-0 left-0
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
      <Actions
        isVideo={isVideo}
        setRatioState={setRatioState}
        scale={scale}
        setScale={setScale}
      />
    </div>
  );
}

export default Canvas;
