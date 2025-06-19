"use client";

import { PrismaMediaType } from "@/../prisma/types/post";
import MutedAudioIcon from "@/app/_globalComponents/Svg/MutedAudioIcon";
import PlayingAudioIcon from "@/app/_globalComponents/Svg/PlayingAudioIcon";
import { useEffect, useRef, useState } from "react";
import { MdAudiotrack } from "react-icons/md";

function VideoMedia({
  media,
  index,
  currentIndex,
}: {
  media: PrismaMediaType;
  index: number;
  currentIndex: number;
}) {
  const { url, poster, transformation, isAudioAllowed } = media;

  const { width, height, x, y } = transformation!;
  const aspectRatio = +width / +height;

  const ContainerRef = useRef<HTMLDivElement | null>(null);
  const [containerSize, setContainerSize] = useState({
    width: 0,
    height: 0,
  });
  const updatedY = +y / (+width / containerSize.width);
  const updatedX = +x / (+height / containerSize.height);

  const VideoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (currentIndex === index) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [index, currentIndex]);

  useEffect(() => {
    if (VideoRef.current) {
      const player = VideoRef.current;

      if (isPlaying) {
        player.play();
      } else {
        player.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (ContainerRef.current) {
      setContainerSize({
        width: ContainerRef.current.getBoundingClientRect().width,
        height: ContainerRef.current.getBoundingClientRect().height,
      });
    }
  }, []);

  return (
    <div
      ref={ContainerRef}
      className="relative min-w-full max-w-[485px] max-h-[585px] cursor-pointer"
      style={{ aspectRatio }}
      onClick={() => setIsPlaying((prev) => !prev)}
    >
      <video
        ref={VideoRef}
        src={url.replace("http://", "https://")}
        className="PostVideo w-full h-full"
        style={
          {
            objectFit: "cover",
            objectPosition: `${
              updatedX > 0 ? updatedX * -1 + "px" : "center"
            } ${updatedY > 0 ? updatedY * -1 + "px" : "center"}`,
          } as React.CSSProperties
        }
        muted={isAudioAllowed === false || isMuted}
        loop
        poster={poster?.url || undefined}
      />
      <button
        type="button"
        className="absolute bottom-6 right-4 z-10 w-7 p-2 aspect-square rounded-full overflow-hidden bg-base-content/50 text-base-100 grid place-content-center"
        onClick={(e) => {
          e.stopPropagation();
          setIsMuted((prev) => !prev);
        }}
        disabled={isAudioAllowed === false}
      >
        {(isAudioAllowed === true || isAudioAllowed === null) &&
          (isMuted ? <MutedAudioIcon /> : <PlayingAudioIcon />)}
        {isAudioAllowed === false && (
          <div className="relative h-full flex justify-center items-center">
            <MdAudiotrack />
            <div className="absolute h-[100%] w-[2px] bg-base-content/70 rotate-45" />
          </div>
        )}
      </button>
    </div>
  );
}
export default VideoMedia;
