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
import { RxThickArrowRight } from "react-icons/rx";

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
      className={`absolute lg:relative right-0 top-0 p-2 bg-base-100 z-20  h-full md:grow border-l flex flex-col 
        ${touchX.isDragEnd ? "transition-transform" : "transition-none"}  
      `}
      style={{
        width: "calc(100% - 64px)",
        transform: `translateX(${editTabTranslateX.new}px)`,
      }}
    >
      <button
        type="button"
        className="lg:hidden px-2 bg-base-content rounded-lg self-end"
        onClick={() =>
          setEditTabTranslateX({
            old: EditTabWidth.current,
            new: EditTabWidth.current,
          })
        }
      >
        <RxThickArrowRight size={24} className="text-base-100" />
      </button>
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
