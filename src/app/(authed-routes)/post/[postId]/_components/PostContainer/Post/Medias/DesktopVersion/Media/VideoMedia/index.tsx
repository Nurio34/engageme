import { useEffect, useRef, useState } from "react";
import { usePostContext } from "@/app/(authed-routes)/post/[postId]/Context";
import { PrismaMediaType } from "../../../../../../../../../../../../prisma/types/post";
import MutedAudioIcon from "@/app/_globalComponents/Svg/MutedAudioIcon";
import PlayingAudioIcon from "@/app/_globalComponents/Svg/PlayingAudioIcon";
import { MdAudiotrack } from "react-icons/md";

function VideoMedia({
  index,
  media,
}: {
  index: number;
  media: PrismaMediaType;
}) {
  const { url, transformation, poster, isAudioAllowed } = media;
  const { width, height, x, y } = transformation!;
  const aspectRatio = +width / +height;

  const { containerWidth, setContainerWidth, mediaIndex, isMuted, setIsMuted } =
    usePostContext();

  const LiRef = useRef<HTMLLIElement | null>(null);
  const [liSize, setLiSize] = useState({ w: 0, h: 0 });
  const VideoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  // const [videoSize, setVideoSize] = useState({ w: 0, h: 0 });

  const objXParam = aspectRatio <= 1 ? -1 : 1;
  const updatedX =
    aspectRatio <= 1 ? (liSize.w / +width) * +x : (+width / liSize.w) * +x;
  const updatedY = (liSize.h / +height) * +y;

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!LiRef.current || !VideoRef.current) return;

    setLiSize({
      w: LiRef.current.getBoundingClientRect().width,
      h: LiRef.current.getBoundingClientRect().height,
    });
    // setVideoSize({
    //   w: VideoRef.current.getBoundingClientRect().width,
    //   h: VideoRef.current.getBoundingClientRect().height,
    // });
  }, [isVideoLoaded]);

  useEffect(() => {
    if (!containerWidth && liSize.w > 0) setContainerWidth(liSize.w);
  }, [liSize, containerWidth]);

  useEffect(() => {
    const video = VideoRef.current;
    if (!video) return;

    if (isPlaying) video.play().catch((e) => console.log("Play failed", e));
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
        className={`object-cover w-full h-full`}
        // ${
        //   liSize.w === videoSize.w && liSize.h > videoSize.h
        //     ? "h-full"
        //     : "w-full"
        // }
        // `}
        style={{
          objectPosition: `${updatedX * objXParam}px ${updatedY * -1}px`,
        }}
        onClick={() => setIsPlaying((prev) => !prev)}
        poster={poster?.url || undefined}
        muted={isAudioAllowed === false || isMuted}
        loop
      />
      <button
        type="button"
        className="absolute z-10 bottom-4 right-4 rounded-full bg-base-content/80 text-base-100
          w-7 aspect-square flex justify-center items-center
        "
        disabled={isAudioAllowed === false}
        onClick={() => setIsMuted((prev) => !prev)}
      >
        {(isAudioAllowed === true || isAudioAllowed === null) &&
          (isMuted ? <MutedAudioIcon /> : <PlayingAudioIcon />)}
        {isAudioAllowed === false && (
          <div className="relative h-full flex justify-center items-center">
            <MdAudiotrack />
            <div className="absolute h-[80%] w-[2px] bg-base-100/80 rotate-45" />
          </div>
        )}
      </button>
    </li>
  );
}
export default VideoMedia;
