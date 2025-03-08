import { useCreateModalContext } from "@/app/(authed-routes)/_globalComponents/CreateModal/Context";
import { CldImage } from "next-cloudinary";
import { useEffect, useRef, useState } from "react";
import { StyleType } from "..";

function Media({ urlState, style }: { urlState: string; style: StyleType }) {
  console.log("render");
  const { baseCanvasContainerWidth, canvasContainerSize } =
    useCreateModalContext();
  const { width, height } = canvasContainerSize;
  const [isLoading, setIsLoading] = useState(true);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const filterStyle = Object.entries(style)
    .map(([key, value]) => `${key}(${value})`)
    .join(" ");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = urlState;
    img.onload = () => {
      canvas.width = width;
      canvas.height = height;
      ctx.filter = filterStyle;
      ctx.drawImage(img, 0, 0, width, height);
    };
  }, [urlState, style, isLoading]);

  return isLoading ? (
    <figure
      className={`relative h-full  ${
        isLoading ? "bg-primary animate-pulse" : ""
      }`}
      style={{ width: baseCanvasContainerWidth }}
      onLoad={() => setIsLoading(false)}
    >
      <CldImage src={urlState} preserveTransformations fill alt="image" />
    </figure>
  ) : (
    <canvas
      ref={canvasRef}
      className={` ${isLoading ? "bg-base-content/60 animate-pulse" : ""}`}
      style={{ width: baseCanvasContainerWidth }}
    />
  );
}

export default Media;
