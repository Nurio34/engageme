import { MediaType } from "@/actions/cloudinary";
import { useCreateModalContext } from "@/app/(authed-routes)/_globalComponents/CreateModal/Context";
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
      <label
        htmlFor="controller"
        className={`${isAnyAudio ? "cursor-pointer" : "cursor-not-allowed"}`}
      >
        <div
          className={`w-10 h-6 flex items-center transition-colors
            ${isSoundOn ? "bg-base-content" : "bg-base-300"}
            `}
          style={{ borderRadius: "50vw" }}
        >
          <div
            className="w-5 bg-base-100 rounded-full transition-transform"
            style={{
              height: 20,
              transform: `${
                isSoundOn ? "translateX(18px)" : "translateX(2px)"
              }`,
            }}
          ></div>
        </div>
        <input
          type="checkbox"
          name="controller"
          id="controller"
          hidden
          checked={isSoundOn}
          disabled={!isAnyAudio}
          onChange={(e) => setIsSoundOn(e.target.checked)}
        />
      </label>
    </div>
  );
}
export default SoundConfig;
