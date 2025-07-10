import {
  EditedMedia,
  useCreateModalContext,
} from "@/app/(authed-routes)/_globalComponents/CreateModal/Context";
import { useAppSelector } from "@/store/hooks";
import { CldVideoPlayer } from "next-cloudinary";
import Image from "next/image";
import { useEffect, useState } from "react";

function Media({ media }: { media: EditedMedia }) {
  const {
    type,
    blob,
    url: videoUrl,
    transformation,
    poster,
    publicId,
    audio,
    isAudioAllowed,
  } = media;

  const { altTexts } = useCreateModalContext();

  const altText = altTexts.find(
    (altObj) => altObj.publicId === publicId
  )?.altText;

  const codec =
    isAudioAllowed === undefined || isAudioAllowed === true
      ? audio?.codec
      : "none";

  const { device } = useAppSelector((s) => s.modals);
  const isDesktop = device.type === "desktop";

  const { baseCanvasContainerWidth } = useCreateModalContext();
  const [width, setWidth] = useState(baseCanvasContainerWidth);

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (blob && !imageUrl) {
      const url = URL.createObjectURL(blob);
      setImageUrl(url);
    }

    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [blob]);

  useEffect(() => {
    const handleWidth = () => {
      setWidth(
        baseCanvasContainerWidth > 0
          ? baseCanvasContainerWidth
          : innerWidth <= 1023
          ? innerWidth
          : 734
      );
    };

    handleWidth();

    window.addEventListener("resize", handleWidth);

    return () => window.removeEventListener("resize", handleWidth);
  }, [baseCanvasContainerWidth]);

  return (
    <div
      className="h-full"
      style={{
        width,
      }}
    >
      {type === "image" ? (
        <figure
          className="relative w-full h-full"
          style={{
            width,
          }}
        >
          {imageUrl && (
            <Image
              src={imageUrl}
              fill
              alt={altText || "image"}
              sizes="(max-width : 768px) 100vw, 50vw"
            />
          )}
        </figure>
      ) : (
        <div
          className="overflow-hidden"
          style={{
            width,
            maxHeight: isDesktop ? "734px" : "calc(100vh - 38.31px)",
          }}
        >
          <CldVideoPlayer
            key={publicId}
            src={videoUrl}
            transformation={{ ...transformation, audio_codec: codec }}
            poster={poster?.url}
          />
        </div>
      )}
    </div>
  );
}
export default Media;
