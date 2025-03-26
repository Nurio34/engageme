import { MediaType } from "@/actions/cloudinary";
import { useCreateModalContext } from "@/app/(authed-routes)/_globalComponents/CreateModal/Context";
import ChecboxToggle from "@/app/_globalComponents/CheckboxToggle";
import { useEffect, useState } from "react";

function SoundConfig({ media }: { media: MediaType }) {
  const { setCloudinaryMedias } = useCreateModalContext();

  const isAnyAudio = media.audio && Object.keys(media.audio).length > 0;
  const [isSoundOn, setIsSoundOn] = useState(isAnyAudio);

  useEffect(() => {
    if (isAnyAudio) {
      setCloudinaryMedias((prev) => {
        const updatedMedias = prev.medias.map((mediaObj) => {
          if (mediaObj.asset_id === media.asset_id) {
            return { ...mediaObj, isAudioAllowed: isSoundOn };
          }

          return mediaObj;
        });

        return { ...prev, medias: updatedMedias };
      });
    }
  }, [isAnyAudio, isSoundOn]);

  return (
    <div className="py-4 flex items-center justify-between">
      <p>
        {isAnyAudio
          ? `Sound ${isSoundOn ? "On" : "Off"}`
          : "Video has no audio"}
      </p>
      <ChecboxToggle
        isChecked={isSoundOn}
        setIsChecked={setIsSoundOn}
        isDisabled={!isAnyAudio}
      />
    </div>
  );
}
export default SoundConfig;
