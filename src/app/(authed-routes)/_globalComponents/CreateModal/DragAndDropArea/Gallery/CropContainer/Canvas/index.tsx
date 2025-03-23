import { useEffect, useRef, useState } from "react";
import Actions from "./Actions";
import { useCreateModalContext } from "../../../../Context";

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
  const {
    canvasContainerSize,
    currentIndex,
    setIsResizingStarted,
    files,
    step,
    AllCanvases,
  } = useCreateModalContext();
  const file = files.files![index];

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mediaRefState, setMediaRefState] = useState<
    HTMLImageElement | HTMLVideoElement | null
  >(null);

  const [mediaSize, setMediaSize] = useState<MediaSizeType>({
    width: 0,
    height: 0,
  });

  const [isVideo, setIsVideo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [originalSize, setOriginalSize] = useState({ w: 0, h: 0 });
  const [cloudinarySize, setCloudinarySize] = useState({ w: 0, h: 0 });

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
  const [originalRatioState, setOriginalRatioState] = useState(0);
  const [ratioState, setRatioState] = useState(0);

  useEffect(() => {
    setRatioState(originalRatioState);
  }, [originalRatioState]);
  const [scale, setScale] = useState(1);
  //! **********************

  //! *** Set canvas size when canvasContainerSize changes ***
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = canvasContainerSize.width;
      canvas.height = canvasContainerSize.height;
    }
  }, [canvasContainerSize]);
  //! **********************************************************

  //! *** Load the media once when url changes ***

  useEffect(() => {
    const typeOfMedia = file.type.split("/")[0];

    if (typeOfMedia === "image") {
      const image = new Image();
      image.src = url;
      image.onload = () => {
        setMediaRefState(image);
      };
    } else {
      const video = document.createElement("video");
      video.src = url;
      video.onloadedmetadata = () => {
        setMediaRefState(video);
      };
    }
  }, [url, currentIndex]);

  useEffect(() => {
    if (!mediaRefState) return;

    if (mediaRefState instanceof HTMLImageElement) {
      const originalRatio =
        mediaRefState.naturalWidth / mediaRefState.naturalHeight;
      setOriginalRatioState(originalRatio);
      let width, height;

      if (ratioState <= 1) {
        if (originalRatio <= 1) {
          width = canvasContainerSize.width;
          height = width / ratioState;
        } else {
          height = canvasContainerSize.height;
          width = height * ratioState;
        }
      } else {
        if (originalRatio <= 1) {
          width = canvasContainerSize.width;
          height = width / ratioState;
        } else {
          height = canvasContainerSize.height;
          width = height * ratioState;
        }
      }

      setMediaSize({ width, height });
    } else {
      if (!isVideo) {
        setIsVideo(true);
      } else {
        const originalRatio =
          mediaRefState.videoWidth / mediaRefState.videoHeight;
        setOriginalRatioState(originalRatio);

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

        if (index === currentIndex) mediaRefState.play();

        mediaRefState.onplay = () => setIsPlaying(true);
        mediaRefState.onpause = () => setIsPlaying(false);
        mediaRefState.onended = () => setIsPlaying(false);
      }
    }
    return () => {
      if (mediaRefState instanceof HTMLVideoElement) {
        mediaRefState.pause();
      }
    };
  }, [
    url,
    canvasContainerSize,
    currentIndex,
    isVideo,
    ratioState,
    mediaRefState,
  ]);
  //! ************************************************

  //! *** adjust image's width and height to be cropable in cloudinary ***
  useEffect(() => {
    if (mediaRefState) {
      const media = mediaRefState;
      let originalWidth: number, originalHeight: number;

      if (media instanceof HTMLImageElement) {
        originalWidth = media.naturalWidth;
        originalHeight = media.naturalHeight;
      } else {
        originalWidth = media.videoWidth;
        originalHeight = media.videoHeight;
      }
      setOriginalSize({ w: originalWidth, h: originalHeight });

      const mediaWidth = mediaSize.width;
      const containerWidth = canvasContainerSize.width;
      const cloudinaryWidth = +(
        (originalWidth / mediaWidth) *
        containerWidth
      ).toFixed();

      const mediaHeight = mediaSize.height;
      const containerHeight = canvasContainerSize.height;
      const cloudinaryHeight = +(
        (originalHeight / mediaHeight) *
        containerHeight
      ).toFixed();

      setCloudinarySize({ w: cloudinaryWidth, h: cloudinaryHeight });
    }
  }, [mediaSize, ratioState]);
  //! **************************************************************

  //! *** Redraw when position changes ***
  useEffect(() => {
    if (!isVideo || !isPlaying) {
      redraw();
    }
  }, [url, position, mediaSize, isVideo, isPlaying, scale]);
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
  }, [url, isVideo, isPlaying, position, mediaSize]);
  //! **************************

  //! *** Drawing function using requestAnimationFrame ***
  const redraw = () => {
    if (canvasRef.current && mediaRefState && mediaSize.width > 0) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.clearRect(
          0,
          0,
          canvasRef.current!.width,
          canvasRef.current!.height
        );
        ctx.drawImage(
          mediaRefState,
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

  //! *** Push canvas to AllCanvas' ref when step === "edit" ***
  useEffect(() => {
    if (
      canvasRef.current &&
      step.step === "edit" &&
      AllCanvases.current.length < files.files!.length
    ) {
      AllCanvases.current.push({
        ref: canvasRef.current,
        index,
        originalSize,
        ratio: ratioState,
        scale,
        cloudinarySize,
        size: {
          w: canvasContainerSize.width,
          h: canvasContainerSize.height,
        },
        isVideo,
        position: { x: position.old_X, y: position.old_Y },
      });
    }
  }, [step]);
  //! ***

  return (
    <div className={`h-full ${currentIndex === index ? "block" : "hidden"}`}>
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
          if (resizing.isStarted) {
            const touch = e.touches[0];
            setResizing((prev) => ({
              ...prev,
              X_End: touch.clientX,
              Y_End: touch.clientY,
            }));
          }
        }}
        onTouchEnd={() => {
          setResizing((prev) => ({ ...prev, isStarted: false }));
        }}
      />
      <Actions
        isVideo={isVideo}
        originalRatioState={originalRatioState}
        setRatioState={setRatioState}
        scale={scale}
        setScale={setScale}
      />
    </div>
  );
}

export default Canvas;
