import Image from "next/image";
import { PrismaMediaType } from "@/../prisma/types/post";

function ImageMedia({ media }: { media: PrismaMediaType }) {
  const { url, altText, width, height } = media;
  const aspectRatio = width! / height!;

  return (
    <figure
      className="relative  min-w-full max-w-[485px] max-h-[585px]"
      style={{ aspectRatio }}
    >
      <Image src={url} alt={altText || "image"} fill />
    </figure>
  );
}
export default ImageMedia;
