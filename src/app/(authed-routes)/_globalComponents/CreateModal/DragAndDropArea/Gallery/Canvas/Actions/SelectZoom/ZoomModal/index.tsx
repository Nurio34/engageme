import { Dispatch, SetStateAction } from "react";

function CropModal({
  scale,
  setScale,
}: {
  scale: number;
  setScale: Dispatch<SetStateAction<number>>;
}) {
  return (
    <div
      className="absolute bottom-full mb-2 bg-base-content text-base-100/50 rounded-md py-1 px-2
        flex items-center gap-x-2
      "
    >
      <input
        type="range"
        name="sclae"
        id="scale"
        value={scale}
        onChange={(e) => setScale(+e.target.value)}
        min={1}
        max={2}
        step={0.1}
      />
      <div>{scale}</div>
    </div>
  );
}
export default CropModal;
