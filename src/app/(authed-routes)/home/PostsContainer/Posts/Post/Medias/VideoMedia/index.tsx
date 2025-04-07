import { Media } from "@prisma/client";
import Image from "next/image";
import { PrismaMediaType } from "@/../prisma/types/post";

function VideoMedia({ media }: { media: PrismaMediaType }) {
  const { url, width, height, isAudioAllowed, transformation } = media;

  return <div className="w-full"></div>;
}
export default VideoMedia;
