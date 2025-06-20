import Image from "next/image";
import { PrismaMediaType } from "@/../prisma/types/post";
import { CldImage } from "next-cloudinary";

function ImageMedia({
  index,
  media,
}: {
  index: number;
  media: PrismaMediaType;
}) {
  const { url, altText, width, height } = media;
  const aspectRatio = width! / height!;

  return (
    <figure
      className="relative  min-w-full max-w-[485px] max-h-[585px]"
      style={{ aspectRatio }}
    >
      <CldImage
        src={url}
        alt={altText || "image"}
        fill
        sizes="(max-width:1024) 100vw, 50vw"
        priority={index === 0}
      />
    </figure>
  );
}
export default ImageMedia;
