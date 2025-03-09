import { CurrentTabType } from "..";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { StyleType } from "../../ImageContainer";
import FilterButton from "./FilterButton";

export type FilterType = {
  name: string;
  style: StyleType;
};

function FiltersTab({
  currentTab,
  url,
  setStyle,
}: {
  currentTab: CurrentTabType;
  url: string;
  setStyle: Dispatch<SetStateAction<StyleType>>;
}) {
  const filters: FilterType[] = [
    {
      name: "Original",
      style: {
        brightness: 1,
        contrast: 1,
        blur: 0,
        sepia: 0,
        saturate: 1,
        "hue-rotate": 0,
      },
    },
    {
      name: "X-Pro II",
      style: {
        contrast: 1.3,
        brightness: 0.8,
        sepia: 0.3,
        saturate: 1.5,
        "hue-rotate": -20,
      },
    },
    {
      name: "Willow",
      style: {
        saturate: 0.02,
        contrast: 0.85,
        brightness: 1.2,
        sepia: 0.02,
      },
    },
    {
      name: "Walden",
      style: {
        sepia: 0.35,
        contrast: 0.9,
        brightness: 1.1,
        "hue-rotate": -10,
        saturate: 1.5,
      },
    },
    {
      name: "Valencia",
      style: {
        sepia: 0.15,
        saturate: 1.5,
        contrast: 0.9,
      },
    },
    {
      name: "Toaster",
      style: {
        sepia: 0.4,
        saturate: 2.5,
        "hue-rotate": -30,
        contrast: 0.67,
      },
    },
    {
      name: "Sutro",
      style: {
        brightness: 0.75,
        contrast: 1.3,
        sepia: 0.5,
        "hue-rotate": -25,
      },
    },
    {
      name: "Sierra",
      style: {
        contrast: 0.8,
        saturate: 1.2,
        sepia: 0.15,
      },
    },
    {
      name: "Rise",
      style: {
        saturate: 1.4,
        sepia: 0.25,
        "hue-rotate": -15,
        contrast: 0.8,
        brightness: 1.1,
      },
    },
    {
      name: "Nashville",
      style: {
        sepia: 0.4,
        saturate: 1.5,
        contrast: 0.9,
        brightness: 1.1,
        "hue-rotate": -15,
      },
    },
    {
      name: "Mayfair",
      style: {
        saturate: 1.4,
        contrast: 1.1,
      },
    },
    {
      name: "Lo-Fi",
      style: {
        contrast: 1.4,
        brightness: 0.9,
        sepia: 0.05,
      },
    },
    {
      name: "Kelvin",
      style: {
        sepia: 0.4,
        saturate: 2.4,
        brightness: 1.3,
        contrast: 1,
      },
    },
    {
      name: "Inkwell",
      style: {
        grayscale: 1,
        brightness: 1.2,
        contrast: 1.05,
      },
    },
    {
      name: "Hudson",
      style: {
        contrast: 1.2,
        brightness: 0.9,
        "hue-rotate": -10,
      },
    },
    {
      name: "Hefe",
      style: {
        contrast: 1.3,
        sepia: 0.3,
        saturate: 1.3,
        "hue-rotate": -10,
        brightness: 0.95,
      },
    },
    {
      name: "Earlybird",
      style: {
        sepia: 0.4,
        saturate: 1.6,
        contrast: 1.1,
        brightness: 0.9,
        "hue-rotate": -10,
      },
    },
    {
      name: "Brannan",
      style: {
        sepia: 0.5,
        contrast: 1.4,
      },
    },
    {
      name: "Amaro",
      style: {
        "hue-rotate": -10,
        contrast: 0.9,
        brightness: 1.1,
        saturate: 1.5,
      },
    },
    {
      name: "1977",
      style: {
        sepia: 0.5,
        "hue-rotate": -30,
        saturate: 1.2,
        contrast: 0.8,
      },
    },
  ];

  const [isLoading, setIsLoading] = useState(true);
  const [containerHeight, setContainerHeight] = useState(0);
  const DivRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (DivRef.current) {
      setContainerHeight(DivRef.current.getBoundingClientRect().height);
    }
  }, [currentTab]);

  return (
    currentTab === "filters" && (
      <div ref={DivRef} className="h-full">
        <ul
          className="grid grid-cols-[repeat(auto-fit,minmax(88px,1fr))] place-content-start gap-4 p-4 overflow-y-auto"
          style={{ height: containerHeight }}
        >
          {filters.map((filter, index) => (
            <FilterButton
              key={filter.name}
              index={index}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              url={url}
              filter={filter}
              setStyle={setStyle}
            />
          ))}
        </ul>
      </div>
    )
  );
}
export default FiltersTab;
