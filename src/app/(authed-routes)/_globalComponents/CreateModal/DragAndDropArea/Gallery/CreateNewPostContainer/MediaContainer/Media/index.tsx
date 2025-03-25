import {
  EditedMedia,
  useCreateModalContext,
} from "@/app/(authed-routes)/_globalComponents/CreateModal/Context";
import { CldVideoPlayer } from "next-cloudinary";
import Image from "next/image";
import { useEffect, useState } from "react";

function Media({ media }: { media: EditedMedia }) {
  const {
    type,
    blob,
    url: videoUrl,
    transformation,
    posterUrl,
    publicId,
    audio,
    isAudioAllowed,
  } = media;

  const codec =
    isAudioAllowed === undefined || isAudioAllowed === true
      ? audio?.codec
      : "none";

  const { baseCanvasContainerWidth } = useCreateModalContext();

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

  return (
    <div className="h-full" style={{ width: baseCanvasContainerWidth }}>
      {type === "image" ? (
        <figure
          className="relative w-full h-full"
          style={{ width: baseCanvasContainerWidth }}
        >
          {imageUrl && (
            <Image
              src={imageUrl}
              fill
              alt="image"
              sizes="(max-width : 768px) 100vw, 50vw"
            />
          )}
        </figure>
      ) : (
        <div style={{ width: baseCanvasContainerWidth }}>
          <CldVideoPlayer
            key={publicId}
            src={videoUrl}
            transformation={{ ...transformation, audio_codec: codec }}
            poster={posterUrl}
          />
        </div>
      )}
    </div>
  );
}
export default Media;
