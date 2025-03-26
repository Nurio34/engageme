import Image from "next/image";
import { useEffect, useState } from "react";
import AltTextControl from "../AltTextControl";
import { useCreateModalContext } from "@/app/(authed-routes)/_globalComponents/CreateModal/Context";
import { UrlType } from "..";

function ImageContainer({ url }: { url: UrlType }) {
  const { altTexts, setAltTexts } = useCreateModalContext();
  const currentAltText = altTexts.find(
    (altObj) => altObj.publicId === url.publicId
  )?.altText;

  const [altText, setAltText] = useState<string>(currentAltText || "");

  useEffect(() => {
    setAltTexts((prev) => {
      const existing = prev.find((altObj) => altObj.publicId === url.publicId);

      if (!existing) {
        return [...prev, { publicId: url.publicId, altText }];
      } else {
        const updatedAltTexts = prev.map((altObj) => {
          if (altObj.publicId === url.publicId) return { ...altObj, altText };
          return altObj;
        });

        return updatedAltTexts;
      }
    });
  }, [altText]);

  if (url.url.trim() === "") return;

  return (
    <div className="flex items-center gap-x-2 pr-1">
      <figure className="relative w-11 aspect-square overflow-hidden rounded-md">
        <Image src={url.url} fill alt={altText || "image"} sizes="5vw" />
      </figure>
      <AltTextControl altText={altText} setAltText={setAltText} />
    </div>
  );
}
export default ImageContainer;
