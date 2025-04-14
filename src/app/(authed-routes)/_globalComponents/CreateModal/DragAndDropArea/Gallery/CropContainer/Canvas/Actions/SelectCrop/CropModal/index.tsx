import { Dispatch, SetStateAction, useState } from "react";
import { CiImageOn } from "react-icons/ci";

function CropModal({
  setRatioState,
  originalRatioState,
  isVideo,
}: {
  setRatioState: Dispatch<SetStateAction<number>>;
  originalRatioState: number;
  isVideo: boolean;
}) {
  const [currentCrop, setCurrentCrop] = useState(0);

  return (
    <div className="absolute grid bottom-full mb-2 bg-base-content text-base-100/50 rounded-md">
      <button
        type="button"
        className={`flex items-center gap-x-2 border-b px-4 py-3
            ${currentCrop === 0 ? "text-base-100" : ""}    
        `}
        onClick={() => {
          setCurrentCrop(0);
          setRatioState(originalRatioState);
        }}
      >
        <span>Original</span>
        <CiImageOn size={28} />
      </button>
      <button
        type="button"
        className={`flex items-center gap-x-2 border-b px-4 py-3
            ${currentCrop === 1 ? "text-base-100" : ""}    
            ${isVideo ? "cursor-not-allowed" : ""}
        `}
        onClick={() => {
          if (isVideo) return;
          setCurrentCrop(1);
          setRatioState(1);
        }}
      >
        <span className={`${isVideo ? "text-base-300/10" : ""}`}>1:1</span>
        <span
          className={`block w-6 border rounded-[3px]
            ${isVideo ? "border-base-300/10" : ""}
          `}
          style={{ aspectRatio: 1 }}
        ></span>
      </button>
      <button
        type="button"
        className={`flex items-center gap-x-2 border-b px-4 py-3
            ${currentCrop === 2 ? "text-base-100" : ""}   
             ${isVideo ? "cursor-not-allowed" : ""} 
        `}
        onClick={() => {
          if (isVideo) return;
          setCurrentCrop(2);
          setRatioState(4 / 5);
        }}
      >
        <span className={`${isVideo ? "text-base-300/10" : ""}`}> 4:5</span>
        <span
          className={`block w-6 border rounded-[3px] ${
            isVideo ? "border-base-300/10" : ""
          }`}
          style={{ aspectRatio: 4 / 5 }}
        ></span>
      </button>
      <button
        type="button"
        className={`flex items-center gap-x-2 px-4 py-3
            ${currentCrop === 3 ? "text-base-100" : ""}  
             ${isVideo ? "cursor-not-allowed" : ""}  
        `}
        onClick={() => {
          if (isVideo) return;
          setCurrentCrop(3);
          setRatioState(16 / 9);
        }}
      >
        <span className={`${isVideo ? "text-base-300/10" : ""}`}>16:9</span>
        <span
          className={`block w-6 border rounded-[3px] ${
            isVideo ? "border-base-300/10" : ""
          }`}
          style={{ aspectRatio: 16 / 9 }}
        ></span>
      </button>
    </div>
  );
}
export default CropModal;
