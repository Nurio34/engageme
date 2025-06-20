import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { PrismaMediaType } from "../../../../../../../../../../../prisma/types/post";
import { MdAudiotrack } from "react-icons/md";
import MutedAudioIcon from "@/app/_globalComponents/Svg/MutedAudioIcon";
import PlayingAudioIcon from "@/app/_globalComponents/Svg/PlayingAudioIcon";
import { useAppSelector } from "@/store/hooks";

// type ObjectPositionType = {
//   x: string;
//   y: string;
// };

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

  const aspectRatio = +width / +height;
  const containerWidth = Math.min(
    containerHeight * aspectRatio,
    window.innerWidth - 420
  );
  // const [objectPosition, setObjectPosition] = useState<ObjectPositionType>({
  //   x: "0px",
  //   y: "0px",
  // });

  const { device } = useAppSelector((s) => s.modals);
  const isDesktop = device.type === "desktop";

  const VideoRef = useRef<HTMLVideoElement | null>(null);
  const [videoWidth, setVideoWidth] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const updatedY = +y / (+width / containerWidth); //! updated version
  const updatedX = +x / (+height / containerHeight); //! updated version

  useEffect(() => {
    if (currentIndex === index) {
      setContainerWidth(containerWidth);
    }
  }, [currentIndex, containerWidth]);

  useEffect(() => {
    if (videoWidth === 0) return;
    if (index === 0) setSlideArray([]);

    setSlideArray((prev) => [...prev, videoWidth]);

    // const objXParam = +width / videoWidth;
    // const objX = +x <= 0 ? "center" : +x * objXParam * -1 + "px";
    // const objYParam = containerHeight / +height;
    // const objY = +y <= 0 ? "center" : +y * objYParam * -1 + "px";
    // setObjectPosition({ x: objX, y: objY });
  }, [videoWidth]);

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

  useEffect(() => {
    if (VideoRef.current)
      setVideoWidth(VideoRef.current.getBoundingClientRect().width);
  }, [containerWidth, device, currentIndex]);

  return (
    <div
      className="relative"
      style={{
        minWidth: isDesktop ? containerWidth : "100%",
        height: containerHeight,
      }}
    >
      <video
        ref={VideoRef}
        src={url.replace("http://", "https://")}
        // className={` ${
        //   +x === 0 && +y === 0
        //     ? "w-full h-full"
        //     : +x === 0
        //     ? "w-full "
        //     : "h-full"
        // }
        // object-cover cursor-pointer`}
        // style={{
        //   maxWidth: isDesktop ? containerHeight : undefined,
        //   objectPosition: `${objectPosition.x} ${objectPosition.y}`,
        // }}
        className="object-cover cursor-pointer w-full  h-full" //! updated version
        style={
          //! updated version
          {
            //! updated version
            objectFit: "cover", //! updated version
            objectPosition: `${
              //! updated version
              updatedX > 0 ? updatedX * -1 + "px" : "center" //! updated version
            } ${updatedY > 0 ? updatedY * -1 + "px" : "center"}`, //! updated version
          } as React.CSSProperties //! updated version
        } //! updated version
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
