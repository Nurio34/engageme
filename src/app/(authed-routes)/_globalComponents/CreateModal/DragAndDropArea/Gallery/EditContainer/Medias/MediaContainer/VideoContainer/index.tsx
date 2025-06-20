import { MediaType } from "@/actions/cloudinary";
import { useCreateModalContext } from "@/app/(authed-routes)/_globalComponents/CreateModal/Context";
import Media from "./Media";
import EditTab from "./EditTab";
import { useState } from "react";

export type PlayerTimeType = { currentTime: number; duration: number };

function VideoContainer({ index, media }: { index: number; media: MediaType }) {
  const { currentIndex } = useCreateModalContext();

  const [playerTime, setPlayerTime] = useState<PlayerTimeType>({
    currentTime: 0,
    duration: 0,
  });

  const {
    eager,
    // secure_url,
    url,
    duration,
    poster,
    asset_id,
    audio,
    isAudioAllowed,
  } = media;
  const eagerUrl = eager![0].url;

  return (
    currentIndex === index && (
      <div className="flex h-full">
        <Media
          eagerUrl={eagerUrl}
          url={url}
          poster={poster}
          asset_id={asset_id}
          setPlayerTime={setPlayerTime}
          audio={audio}
          isAudioAllowed={isAudioAllowed}
        />
        <EditTab
          eagerUrl={eagerUrl}
          url={url}
          duration={duration}
          asset_id={asset_id}
          playerTime={playerTime}
          media={media}
        />
      </div>
    )
  );
}
export default VideoContainer;
