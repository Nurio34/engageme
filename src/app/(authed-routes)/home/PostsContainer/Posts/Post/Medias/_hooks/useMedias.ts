import { useEffect, useRef, useState } from "react";

export const useMedias = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const MediasContainerRef = useRef<HTMLDivElement | null>(null);
  const [mediasContainerWidth, setMediasContainerWidth] = useState(0);

  useEffect(() => {
    const handleWidth = () => {
      if (MediasContainerRef.current) {
        setMediasContainerWidth(
          MediasContainerRef.current.getBoundingClientRect().width
        );
      }
    };
    handleWidth();

    window.addEventListener("resize", handleWidth);

    return () => window.removeEventListener("resize", handleWidth);
  }, []);

  return {
    MediasContainerRef,
    currentIndex,
    mediasContainerWidth,
    setCurrentIndex,
  };
};
