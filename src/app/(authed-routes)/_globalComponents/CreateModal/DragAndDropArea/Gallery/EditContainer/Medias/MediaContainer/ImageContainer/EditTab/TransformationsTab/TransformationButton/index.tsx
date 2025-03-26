import { CldImage } from "next-cloudinary";
import { Dispatch, SetStateAction } from "react";
import { TransformationType } from "..";

function TransformationButton({
  currentName,
  setCurrentName,
  isLoading,
  setIsLoading,
  transformation,
  setUrlState,
  setIsNewUrlDownloading,
}: {
  currentName: string;
  setCurrentName: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  transformation: TransformationType;
  setUrlState: Dispatch<SetStateAction<string>>;
  setIsNewUrlDownloading: Dispatch<SetStateAction<boolean>>;
}) {
  const { name, url } = transformation;

  if (!url) return;

  const isCurrent = currentName === name;

  return (
    <li
      className="cursor-pointer"
      onClick={() => {
        setCurrentName(name);
        setIsNewUrlDownloading(true);
        setUrlState(url);
      }}
    >
      <figure
        className={`relative w-full aspect-square rounded-md overflow-hidden ${
          isLoading ? "bg-base-content/60 animate-pulse" : ""
        }${isCurrent ? "outline outline-2 outline-secondary" : ""}`}
      >
        <CldImage
          src={url}
          fill
          sizes="10vw"
          alt="image"
          preserveTransformations
          onLoad={() => setIsLoading(false)}
        />
      </figure>
      <p
        className={`p-1 text-xs text-center text-base-content/50 capitalize
          ${isCurrent ? "text-secondary font-semibold" : ""}
        `}
      >
        {name}
      </p>
    </li>
  );
}
export default TransformationButton;
