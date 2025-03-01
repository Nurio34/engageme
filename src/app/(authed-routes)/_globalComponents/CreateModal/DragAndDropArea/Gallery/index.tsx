import Image from "next/image";
import { FilesType } from "..";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Canvas from "./Canvas";

export type CanvasContainerSizeType = {
  width: number;
  height: number;
};

function Gallery({ files }: { files: FilesType }) {
  const CanvasContainerRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState<CanvasContainerSizeType>({
    width: 0,
    height: 0,
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (CanvasContainerRef.current) {
        const width = CanvasContainerRef.current.getBoundingClientRect().width;
        const height =
          CanvasContainerRef.current.getBoundingClientRect().height;
        setSize({ width, height });
        console.log("ok");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={CanvasContainerRef}
      className="relative w-full h-full bg-blue-200"
    >
      <Canvas size={size} url={files.urls![currentIndex]} />
    </div>
  );
}
export default Gallery;
