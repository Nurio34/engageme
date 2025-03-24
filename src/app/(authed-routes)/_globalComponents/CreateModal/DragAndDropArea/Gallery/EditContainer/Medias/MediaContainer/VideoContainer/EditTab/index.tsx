import CoverPhoto from "./CoverPhoto";
import TrimVideo from "./TrimVideo";
import { useGetPosters } from "../hooks/useGetPosters";
import { PlayerTimeType } from "..";
import SoundConfig from "./SoundConfig";
import { MediaType } from "@/actions/cloudinary";
import { devControls } from "@/devUtils";
import CloseSlider from "../../CloseSlider";
import { useRef, useState } from "react";
import { useEditTabControl } from "../../CloseSlider/useEditTabControl";

function EditTab({
  eagerUrl,
  url,
  duration,
  asset_id,
  playerTime,
  media,
}: {
  eagerUrl: string;
  url: string;
  duration: number | undefined;
  asset_id: string;
  playerTime: PlayerTimeType;
  media: MediaType;
}) {
  const posters = useGetPosters(duration, eagerUrl);

  const EditTabRef = useRef<HTMLDivElement | null>(null);
  const [isEditRequested, setIsEditRequested] = useState(false);

  const {
    editTabTranslateX,
    setEditTabTranslateX,
    EditTabWidth,
    touchX,
    setTouchX,
  } = useEditTabControl(EditTabRef, isEditRequested);
  return (
    <div
      ref={EditTabRef}
      className={`absolute right-0 top-0 p-2 bg-base-100 z-20 md:relative h-full md:grow border-l flex flex-col
        ${touchX.isDragEnd ? "transition-transform" : "transition-none"}  
      `}
      style={{
        width: "calc(100% - 64px)",
        transform: `translateX(${editTabTranslateX.new}px)`,
      }}
    >
      {devControls.Video.CoverPhoto && (
        <CoverPhoto posters={posters} media={media} />
      )}
      {devControls.Video.TrimControls && (
        <TrimVideo
          url={url}
          posters={posters}
          duration={duration}
          asset_id={asset_id}
          playerTime={playerTime}
        />
      )}
      <SoundConfig media={media} />
      <CloseSlider
        editTabTranslateX={editTabTranslateX}
        setEditTabTranslateX={setEditTabTranslateX}
        EditTabWidth={EditTabWidth}
        setTouchX={setTouchX}
        setIsEditRequested={setIsEditRequested}
      />
    </div>
  );
}
export default EditTab;
