import { useCreateModalContext } from "@/app/(authed-routes)/_globalComponents/CreateModal/Context";
import { useEffect, useState } from "react";
import ImageContainer from "./ImageContainer";

export type UrlType = {
  publicId: string;
  url: string;
};

function Images() {
  const { editedMedias } = useCreateModalContext();
  const imageMedias = editedMedias.filter((media) => media.type === "image");

  const [urls, setUrls] = useState<UrlType[]>([]);

  useEffect(() => {
    setUrls(
      imageMedias.map((media) => {
        if (!media.blob) return { publicId: media.publicId, url: "" };
        return {
          publicId: media.publicId,
          url: URL.createObjectURL(media.blob),
        };
      })
    );

    return () => {
      if (urls.length > 0)
        urls.forEach((urlObj) => {
          if (urlObj.url.trim() !== "") URL.revokeObjectURL(urlObj.url);
        });
    };
  }, [editedMedias]);

  if (urls.length === 0) return;

  return (
    <ul className="space-y-2">
      {urls.map((url, index) => (
        <ImageContainer key={index} url={url} />
      ))}
    </ul>
  );
}
export default Images;
