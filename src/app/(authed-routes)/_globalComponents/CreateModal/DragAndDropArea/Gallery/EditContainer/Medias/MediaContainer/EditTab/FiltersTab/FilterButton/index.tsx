import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { StyleType } from "../../../ImageContainer";
import { FilterType } from "..";

function FilterButton({
  isLoading,
  setIsLoading,
  urlState,
  filter,
  setStyle,
}: {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  urlState: string;
  filter: FilterType;
  setStyle: Dispatch<SetStateAction<StyleType>>;
}) {
  const filterStyle = Object.entries(filter.style)
    .map(([key, value]) => `${key}(${value})`)
    .join(" ");

  return (
    <li className="cursor-pointer" onClick={() => setStyle(filter.style)}>
      <figure
        className={`relative w-full aspect-square rounded-md overflow-hidden ${
          isLoading ? "bg-base-content/60 animate-pulse" : ""
        }`}
      >
        <Image
          src={urlState}
          fill
          alt="image"
          style={{ filter: filterStyle }}
          onLoad={() => setIsLoading(false)}
        />
      </figure>
      <p className="p-1 text-xs text-center text-base-content/50">
        {filter.name}
      </p>
    </li>
  );
}
export default FilterButton;
