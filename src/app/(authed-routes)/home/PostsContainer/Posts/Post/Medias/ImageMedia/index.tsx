import { Media } from "@prisma/client";
import Image from "next/image";

function ImageMedia({ media }: { media: Media }) {
  const { url, altText, width, height } = media;

  const aspectRatio = width! / height!;

  return (
    <figure
      className="relative w-full rounded-md overflow-hidden"
      style={{ aspectRatio }}
    >
      <Image src={url} alt={altText || "image"} fill />
    </figure>
  );
}
export default ImageMedia;
