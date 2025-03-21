import { useCreateModalContext } from "@/app/(authed-routes)/_globalComponents/CreateModal/Context";
import { CldImage } from "next-cloudinary";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { StyleType } from "..";

function Media({
  asset_id,
  urlState,
  style,
  otherStyle,
  isNewUrlDownloading,
  setIsNewUrlDownloading,
}: {
  asset_id: string;
  urlState: string;
  style: StyleType;
  otherStyle: StyleType;
  isNewUrlDownloading: boolean;
  setIsNewUrlDownloading: Dispatch<SetStateAction<boolean>>;
}) {
  const {
    baseCanvasContainerWidth,
    canvasContainerSize,
    cloudinaryMedias,
    setCloudinaryMedias,
  } = useCreateModalContext();
  const { width, height } = canvasContainerSize;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const filterStyle = Object.entries(style)
    .map(
      ([key, value]) =>
        `${key}(${key === "sepia" ? value / 10 : value}${
          key === "hue-rotate" ? "deg" : key === "blur" ? "px" : ""
        })`
    )
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
      ctx.globalAlpha = otherStyle.opacity;
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob((blob) => {
        if (blob) {
          const updatedMedias = cloudinaryMedias.medias.map((mediaObj) => {
            if (mediaObj.asset_id === asset_id) {
              return { ...mediaObj, blob };
            }

            return mediaObj;
          });
          setCloudinaryMedias((prev) => ({ ...prev, medias: updatedMedias }));
        }
      }, "image/png");
    };
  }, [urlState, style, otherStyle, isNewUrlDownloading]);

  return isNewUrlDownloading ? (
    <figure
      className={`relative h-full  ${
        isNewUrlDownloading ? "bg-base-300 animate-pulse" : ""
      }`}
      style={{ width: baseCanvasContainerWidth }}
    >
      <CldImage
        src={urlState}
        preserveTransformations
        fill
        alt="image"
        onLoad={() => setIsNewUrlDownloading(false)}
      />
    </figure>
  ) : (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className={`w-full h-full ${
          isNewUrlDownloading ? "bg-base-content/60 animate-pulse" : ""
        }`}
        style={{ width: baseCanvasContainerWidth }}
      />
      <div
        className="EditCanvasContainer"
        style={{ "--depth": otherStyle.depth } as React.CSSProperties}
      ></div>
    </div>
  );
}

export default Media;
