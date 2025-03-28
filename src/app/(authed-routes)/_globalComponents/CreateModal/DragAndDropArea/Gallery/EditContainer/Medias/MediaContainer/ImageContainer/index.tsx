import { MediaType } from "@/actions/cloudinary";
import { useCreateModalContext } from "@/app/(authed-routes)/_globalComponents/CreateModal/Context";
import Media from "./Media";
import { useState } from "react";
import EditTab from "./EditTab";

export type StyleType = Record<string, number>;

function ImageContainer({ index, media }: { index: number; media: MediaType }) {
  const { currentIndex } = useCreateModalContext();
  const { eager, asset_id, secure_url } = media;
  const { secure_url: eagerUrl } = eager![0];

  const [urlState, setUrlState] = useState(eagerUrl);
  const [isNewUrlDownloading, setIsNewUrlDownloading] = useState(true);

  //! *** Scale down image to be able to "Enhance" applied ***
  // const { newWidth, newHeight } = scaleDown(width, height);
  // // LINT console.log({ newWidth, newHeight });
  //! ********************

  const [style, setStyle] = useState<StyleType>({
    brightness: 1,
    contrast: 1,
    sepia: 0,
    saturate: 1,
    "hue-rotate": 0,
    blur: 0,
  });

  const [otherStyle, setOtherStyle] = useState<StyleType>({
    opacity: 1,
    depth: 0,
  });

  return (
    currentIndex === index && (
      <div className="h-full md:flex">
        <Media
          asset_id={asset_id}
          urlState={urlState}
          style={style}
          otherStyle={otherStyle}
          isNewUrlDownloading={isNewUrlDownloading}
          setIsNewUrlDownloading={setIsNewUrlDownloading}
        />
        <EditTab
          url={secure_url}
          style={style}
          setStyle={setStyle}
          setOtherStyle={setOtherStyle}
          setUrlState={setUrlState}
          setIsNewUrlDownloading={setIsNewUrlDownloading}
          eagerUrl={eagerUrl}
        />
      </div>
    )
  );
}
export default ImageContainer;
