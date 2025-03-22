import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { FilterType } from "..";
import { StyleType } from "../../..";

function FilterButton({
  index,
  currentIndex,
  setCurrentIndex,
  isLoading,
  setIsLoading,
  url,
  filter,
  setStyle,
}: {
  index: number;
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  url: string;
  filter: FilterType;
  setStyle: Dispatch<SetStateAction<StyleType>>;
}) {
  const filterStyle = Object.entries(filter.style)
    .map(
      ([key, value]) => `${key}(${value}${key === "hue-rotate" ? "deg" : ""})`
    )
    .join(" ");

  const isCurrent = currentIndex === index;

  return (
    <li
      className="cursor-pointer"
      onClick={() => {
        setCurrentIndex(index);
        setStyle(filter.style);
      }}
    >
      <figure
        className={`relative w-full aspect-square rounded-md overflow-hidden ${
          isLoading ? "bg-base-content/60 animate-pulse" : ""
        } ${isCurrent ? "outline outline-2 outline-info" : ""}`}
      >
        <Image
          src={url}
          fill
          sizes="10vw"
          alt="image"
          style={{ filter: filterStyle }}
          onLoad={() => setIsLoading(false)}
        />
      </figure>
      <p
        className={`p-1 text-xs text-center text-base-content/50
          ${isCurrent ? "text-info font-semibold" : ""}
        `}
      >
        {filter.name}
      </p>
    </li>
  );
}
export default FilterButton;
