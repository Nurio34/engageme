import { useEffect, useRef } from "react";
import { CanvasContainerSizeType } from "..";

function Canvas({ size, url }: { size: CanvasContainerSizeType; url: string }) {
  const CanvasRef = useRef<HTMLCanvasElement | null>(null);
  console.log(size);
  useEffect(() => {
    if (CanvasRef.current) {
      const canvas = CanvasRef.current;
      const ctx = canvas.getContext("2d");
      canvas.width = size.width;
      canvas.height = size.height;

      if (ctx) {
        const image = new Image();
        console.log(image);
        image.src = url;
        image.onload = () => {
          //TODO : geniş resim - uzun resim problemi
          const ratio = image.naturalWidth / image.naturalHeight;
          ctx.drawImage(image, 0, 0, size.width, size.width / ratio);
          image.style.objectFit = "cover";
        };
      }
    }
  }, [size]);
  return <canvas ref={CanvasRef} />;
}
export default Canvas;
