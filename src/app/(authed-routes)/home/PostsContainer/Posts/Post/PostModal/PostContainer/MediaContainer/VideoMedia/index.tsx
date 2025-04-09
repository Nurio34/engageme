import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { PrismaMediaType } from "../../../../../../../../../../../prisma/types/post";
import { MdAudiotrack } from "react-icons/md";
import MutedAudioIcon from "@/app/_globalComponents/Svg/MutedAudioIcon";
import PlayingAudioIcon from "@/app/_globalComponents/Svg/PlayingAudioIcon";

function VideoMedia({
  index,
  media,
  containerHeight,
  setContainerWidth,
  currentIndex,
  setSlideArray,
}: {
  index: number;
  media: PrismaMediaType;
  containerHeight: number;
  setContainerWidth: Dispatch<SetStateAction<number>>;
  currentIndex: number;
  setSlideArray: Dispatch<SetStateAction<number[]>>;
}) {
  const { url, transformation, isAudioAllowed, poster } = media;
  const { width, height, x, y } = transformation!;

  const aspectRatio = (+width + +x) / (+height + +y);
  const updatedWidth = containerHeight * aspectRatio;

  const VideoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (currentIndex === index) {
      console.log({ width, height, x, y, aspectRatio });

      setContainerWidth(updatedWidth);
    }
  }, [currentIndex, updatedWidth]);

  useEffect(() => {
    if (updatedWidth === 0) return;

    setSlideArray((prev) => [...prev, updatedWidth]);
  }, [updatedWidth]);

  useEffect(() => {
    if (currentIndex === index) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (VideoRef.current) {
      VideoRef.current.muted = isMuted;
    }
  }, [isMuted]);

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

  return (
    <div
      className="relative"
      style={{ minWidth: updatedWidth, height: containerHeight }}
    >
      <video
        ref={VideoRef}
        src={url}
        className="w-full h-full object-cover cursor-pointer"
        muted
        loop
        poster={poster?.url || ""}
        onClick={() => setIsPlaying((prev) => !prev)}
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
        {isAudioAllowed === false ? (
          <div className="relative">
            <MdAudiotrack />
            <div className="absolute border-l-2 border-base-content h-full -scale-y-125 -rotate-45 z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "></div>
          </div>
        ) : isMuted ? (
          <MutedAudioIcon />
        ) : (
          <PlayingAudioIcon />
        )}
      </button>
    </div>
  );
}
export default VideoMedia;
