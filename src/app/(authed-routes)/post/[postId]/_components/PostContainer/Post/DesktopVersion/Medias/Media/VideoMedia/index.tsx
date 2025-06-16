import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePostContext } from "@/app/(authed-routes)/post/[postId]/Context";
import { PrismaMediaType } from "../../../../../../../../../../../../prisma/types/post";
import MutedAudioIcon from "@/app/_globalComponents/Svg/MutedAudioIcon";
import PlayingAudioIcon from "@/app/_globalComponents/Svg/PlayingAudioIcon";

function VideoMedia({
  index,
  media,
}: {
  index: number;
  media: PrismaMediaType;
}) {
  const { url, transformation } = media;
  const { width, height, x, y } = transformation!;
  const aspectRatio = +width / +height;

  const {
    containerWidth,
    setContainerWidth,
    MediasRef,
    mediaIndex,
    isMuted,
    setIsMuted,
  } = usePostContext();

  const LiRef = useRef<HTMLLIElement | null>(null);
  const [liSize, setLiSize] = useState({ w: 0, h: 0 });
  const VideoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoSize, setVideoSize] = useState({ w: 0, h: 0 });

  const updatedX = (liSize.w / +width) * +x;
  const updatedY = (liSize.h / +height) * +y;

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!LiRef.current || !VideoRef.current) return;

    setLiSize({
      w: LiRef.current.getBoundingClientRect().width,
      h: LiRef.current.getBoundingClientRect().height,
    });
    setVideoSize({
      w: VideoRef.current.getBoundingClientRect().width,
      h: VideoRef.current.getBoundingClientRect().height,
    });

    MediasRef.current.push(LiRef.current);
  }, [isVideoLoaded]);

  useEffect(() => {
    if (!containerWidth && liSize.w > 0) setContainerWidth(liSize.w);
  }, [liSize, containerWidth]);

  useEffect(() => {
    const video = VideoRef.current;
    if (!video) return;

    if (isPlaying) video.play();
    else video.pause();
  }, [isPlaying]);

  useEffect(() => {
    if (index === mediaIndex) setIsPlaying(true);
    else setIsPlaying(false);
  }, [mediaIndex]);

  return (
    <li ref={LiRef} className="h-full relative" style={{ aspectRatio }}>
      <video
        ref={VideoRef}
        src={url}
        onLoadedMetadata={() => setIsVideoLoaded(true)} // ✅ Fires when video metadata is ready (dimensions, duration, etc.)
        className={`object-cover h-full
          ${
            liSize.w === videoSize.w && liSize.h > videoSize.h
              ? "h-full"
              : "w-full"
          }
        `}
        style={{ objectPosition: `${updatedX * -1}px ${updatedY * -1}px` }}
        onClick={() => setIsPlaying((prev) => !prev)}
        muted={isMuted}
      />
      <button
        type="button"
        className="absolute z-10 bottom-4 right-4 rounded-full bg-base-content/80 text-base-100
          w-7 aspect-square flex justify-center items-center
        "
        onClick={() => setIsMuted((prev) => !prev)}
      >
        {isMuted ? <MutedAudioIcon /> : <PlayingAudioIcon />}
      </button>
    </li>
  );
}
export default VideoMedia;
