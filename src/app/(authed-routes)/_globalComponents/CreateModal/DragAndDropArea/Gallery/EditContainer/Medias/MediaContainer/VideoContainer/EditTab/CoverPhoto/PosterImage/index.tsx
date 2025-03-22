import { useCreateModalContext } from "@/app/(authed-routes)/_globalComponents/CreateModal/Context";
import Image from "next/image";
import { useState } from "react";

function PosterImage({
  index,
  poster,
  asset_id,
}: {
  index: number;
  poster: string;
  asset_id: string;
}) {
  const { setCloudinaryMedias } = useCreateModalContext();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li
      className="grow h-full cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        setCloudinaryMedias((prev) => {
          const medias = prev.medias;
          const updatedMedias = medias.map((mediaObj) => {
            if (mediaObj.asset_id === asset_id) {
              return {
                ...mediaObj,
                poster: { url: `${poster}.jpg`, publicId: "" },
              };
            }
            return mediaObj;
          });

          return { ...prev, medias: updatedMedias };
        });
      }}
    >
      <figure
        className={`relative h-full transition-all ${
          isHovered ? "rounded-lg" : ""
        }`}
        style={{
          scale: isHovered ? 1.2 : undefined,
          zIndex: isHovered ? 2 : 0,
        }}
      >
        <Image
          src={poster}
          fill
          alt="poster"
          className={`object-conver ${isHovered ? "rounded-lg" : ""} ${
            index === 0 ? "rounded-tl-lg rounded-bl-lg" : ""
          }${index === 4 ? "rounded-tr-lg rounded-br-lg" : ""}`}
          sizes="(max-width: 768px) 50vw, 10vw"
        />
        {isHovered && (
          <div
            className={`absolute top-0 left-0 w-full h-full z-50 ${
              isHovered ? "rounded-lg" : ""
            }`}
            style={{
              boxShadow: "0 3px 3px gray,0 3px 6px gray,0 3px 9px gray",
            }}
          />
        )}
      </figure>
    </li>
  );
}
export default PosterImage;
