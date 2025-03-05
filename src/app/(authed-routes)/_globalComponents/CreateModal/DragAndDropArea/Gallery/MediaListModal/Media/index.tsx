import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useCreateModalContext } from "../../../../Context";
import Image from "next/image";
import { IoIosClose } from "react-icons/io";
import { DraggingItemType, FilesNewOrderType } from "..";

function Media({
  LiRef,
  index,
  draggingItem,
  setDraggingItem,
  fileType,
  url,
  deleteFile,
  setFilesNewOrder,
}: {
  LiRef: RefObject<HTMLLIElement[]>;
  index: number;
  draggingItem: DraggingItemType;
  setDraggingItem: Dispatch<SetStateAction<DraggingItemType>>;
  fileType: string;
  url: string;
  deleteFile: (index: number) => void;
  setFilesNewOrder: Dispatch<SetStateAction<FilesNewOrderType>>;
}) {
  const { currentIndex, setCurrentIndex } = useCreateModalContext();
  const [itemIndex, setItemIndex] = useState(index);
  const { oldPosition, newPosition, isDragEnded } = draggingItem;

  useEffect(() => {
    if (itemIndex === oldPosition) {
      setItemIndex(newPosition);
    }
    if (itemIndex === newPosition) {
      setItemIndex(oldPosition);
    }
    if (oldPosition !== newPosition) {
      setDraggingItem((prev) => ({
        ...prev,
        oldPosition: prev.newPosition,
      }));
    }
    if (isDragEnded) {
      setFilesNewOrder((prev) => ({ ...prev, [index]: itemIndex }));
    }
  }, [draggingItem]);

  return (
    <li
      ref={(el) => {
        LiRef.current[index] = el!;
      }}
      key={index}
      className={`relative w-24 aspect-square rounded-md overflow-hidden cursor-pointer select-none transition-transform
        ${currentIndex === index ? "brightness-105" : "brightness-50 "}
      `}
      style={{
        transform: `translateX(${(itemIndex - index) * 104}px)`,
      }}
      onClick={() => setCurrentIndex(index)}
      draggable
      onDragStartCapture={(e) => {
        e.currentTarget.style.opacity = "0.01";
        setDraggingItem({
          oldPosition: itemIndex,
          newPosition: itemIndex,
          isDragEnded: false,
        });
      }}
      onDragEnterCapture={() => {
        if (oldPosition === itemIndex) return;

        setDraggingItem((prev) => ({
          ...prev,
          newPosition: itemIndex,
        }));
      }}
      onDragEndCapture={(e) => {
        e.currentTarget.style.opacity = "1";
        setDraggingItem((prev) => ({ ...prev, isDragEnded: true }));
      }}
    >
      {fileType === "image" ? (
        <Image
          src={url}
          fill
          alt="image"
          className="object-cover pointer-events-none"
          priority
          sizes="100vw"
        />
      ) : (
        <div className=" flex items-center justify-center w-full h-full">
          <video src={url} className="scale-[1.8]"></video>
        </div>
      )}
      {currentIndex === index && (
        <button
          type="button"
          className="absolute top-1 right-1 btn btn-xs btn-circle bg-base-content border-base-content"
          onClick={() => {
            deleteFile(index);
          }}
        >
          <IoIosClose size={24} className="text-base-100" />
        </button>
      )}
    </li>
  );
}
export default Media;
