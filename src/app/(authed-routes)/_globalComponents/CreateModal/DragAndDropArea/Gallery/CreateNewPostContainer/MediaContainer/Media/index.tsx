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
    <div style={{ width: baseCanvasContainerWidth }}>
      {type === "image" ? (
        <figure className="relative w-full h-full">
          {imageUrl && <Image src={imageUrl} fill alt="image" />}
        </figure>
      ) : (
        <CldVideoPlayer
          key={publicId}
          src={videoUrl}
          transformation={{ ...transformation, audio_codec: codec }}
          poster={posterUrl}
        />
      )}
    </div>
  );
}
export default Media;
