import { usePostContext } from "@/app/(authed-routes)/post/[postId]/Context";
import { PrismaMediaType } from "../../../../../../../../../../../../prisma/types/post";
import { useEffect, useRef, useState } from "react";
import MutedAudioIcon from "@/app/_globalComponents/Svg/MutedAudioIcon";
import PlayingAudioIcon from "@/app/_globalComponents/Svg/PlayingAudioIcon";
import { MdAudiotrack } from "react-icons/md";

function VideoMedia({
  index,
  media,
  divWidth,
}: {
  index: number;
  media: PrismaMediaType;
  divWidth: number;
}) {
  const { poster, url, transformation, isAudioAllowed } = media;
  const { width, height, x, y } = transformation!;
  const aspectRatio = +width / +height;
  const newHeight = divWidth / aspectRatio;

  const adjustmentParameter = +width / divWidth;
  const newX = +x / adjustmentParameter;
  const newY = +y / adjustmentParameter;

  const objXParam = aspectRatio <= 1 ? -1 : 0;

  const { mediaIndex, isMuted, setIsMuted } = usePostContext();

  const LiRef = useRef<HTMLLIElement | null>(null);

  const VideoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!LiRef.current) return;

    if (index === mediaIndex)
      LiRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
  }, [mediaIndex]);

  useEffect(() => {
    if (index === mediaIndex) setIsPlaying(true);
    else setIsPlaying(false);
  }, [mediaIndex, index]);

  useEffect(() => {
    if (!VideoRef.current) return;

    if (isPlaying)
      VideoRef.current.play().catch((e) => console.log("Play failed", e));
    else VideoRef.current.pause();
  }, [isPlaying]);

  return (
    <li ref={LiRef} style={{ minWidth: divWidth, height: newHeight }}>
      <video
        ref={VideoRef}
        src={url}
        // className={`object-cover
        //     ${Math.abs(+y) >= 0 ? "w-full" : ""}
        //     ${Math.abs(+x) >= 0 ? "h-full" : ""}
        // `}
        style={{
          objectPosition: `${newX * objXParam}px ${newY * -1}px`,
        }}
        className="object-cover h-full w-full"
        onClick={() => setIsPlaying((prev) => !prev)}
        loop
        poster={poster?.url || undefined}
        muted={isAudioAllowed === false || isMuted}
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
