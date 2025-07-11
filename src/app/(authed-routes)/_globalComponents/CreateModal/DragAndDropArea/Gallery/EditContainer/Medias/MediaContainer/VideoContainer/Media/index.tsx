import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useCreateModalContext } from "@/app/(authed-routes)/_globalComponents/CreateModal/Context";
import { CldVideoPlayer, CloudinaryVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";
import { PlayerTimeType } from "..";
import { PosterType } from "@/actions/cloudinary";
import { useAppSelector } from "@/store/hooks";

function Media({
  eagerUrl,
  url,
  poster,
  asset_id,
  setPlayerTime,
  audio,
  isAudioAllowed,
}: {
  eagerUrl: string;
  url: string;
  poster: PosterType | undefined;
  asset_id: string;
  setPlayerTime: Dispatch<SetStateAction<PlayerTimeType>>;
  audio: Record<string, string | number> | undefined;
  isAudioAllowed: boolean | undefined;
}) {
  const codec = !audio || !isAudioAllowed ? "none" : audio.codec;

  const { device } = useAppSelector((s) => s.modals);
  const isDesktop = device.type === "desktop";

  const { baseCanvasContainerWidth, cloudinaryMedias, setCloudinaryMedias } =
    useCreateModalContext();

  const [isLoaded, setisLoaded] = useState(false);
  const [isRendered, setIsRendered] = useState(true);

  const PlayerRef = useRef<CloudinaryVideoPlayer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const PlayerInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsRendered(false);
  }, [cloudinaryMedias]);

  useEffect(() => {
    if (!isRendered) setIsRendered(true);
  }, [isRendered]);

  const { c, w, h, x, y } = Object.fromEntries(
    eagerUrl
      .split("/")[6]
      .split(",")
      .map((item) => item.split("_"))
  );

  const { so, du } = Object.fromEntries(
    url
      .split("/")[6]
      .split(",")
      .map((item) => item.split("_"))
  );

  useEffect(() => {
    const updatedMedias = cloudinaryMedias.medias.map((mediaObj) => {
      if (mediaObj.asset_id === asset_id) {
        return {
          ...mediaObj,
          transformations: {
            ...mediaObj.transformations,
            start_offset: so,
            duration: du,
          },
        };
      }
      return mediaObj;
    });
    setCloudinaryMedias((prev) => ({ ...prev, medias: updatedMedias }));
  }, [so, du]);

  useEffect(() => {
    if (isPlaying && PlayerRef.current) {
      PlayerInterval.current = setInterval(() => {
        const player = PlayerRef.current;
        if (!player) return;

        const currentTime = player.currentTime?.();
        const duration = player.duration?.();

        if (typeof currentTime === "number") {
          setPlayerTime({ currentTime, duration });
        }
      }, 100);
    } else {
      if (PlayerInterval.current) {
        clearInterval(PlayerInterval.current);
        setPlayerTime({ currentTime: 0, duration: 0 });
      }
    }

    return () => {
      if (PlayerInterval.current) clearInterval(PlayerInterval.current);
    };
  }, [setPlayerTime, isRendered, isPlaying]);

  return (
    <div
      className={` overflow-hidden ${
        !isLoaded ? "bg-base-content/50 animate-pulse" : "flex items-center"
      }`}
      style={{
        minWidth: baseCanvasContainerWidth,
        maxHeight: isDesktop ? "734px" : "calc(100vh - 38.31px)",
      }}
    >
      {isRendered && (
        <CldVideoPlayer
          key={asset_id}
          src={url}
          transformation={{
            crop: c,
            width: w,
            height: h,
            x,
            y,
            start_offset: so,
            duration: du,
            audio_codec: codec,
          }}
          className="w-full h-full"
          onDataLoad={() => setisLoaded(true)}
          poster={poster?.url}
          playerRef={PlayerRef}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      )}
    </div>
  );
}
export default Media;
