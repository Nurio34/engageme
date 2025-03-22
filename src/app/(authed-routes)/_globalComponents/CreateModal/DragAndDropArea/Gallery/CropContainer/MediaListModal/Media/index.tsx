import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { IoIosClose } from "react-icons/io";
import { DraggingItemType } from "..";
import { useCreateModalContext } from "@/app/(authed-routes)/_globalComponents/CreateModal/Context";

function Media({
  LiRef,
  index,
  draggingItem,
  setDraggingItem,
  fileType,
  url,
  deleteFile,
  isTouchDragStarted,
  setIsTouchDragStarted,
  isScrollingStarted,
  scrollLeft,
}: {
  LiRef: RefObject<HTMLLIElement[] | null[]>;
  index: number;
  draggingItem: DraggingItemType;
  setDraggingItem: Dispatch<SetStateAction<DraggingItemType>>;
  fileType: string;
  url: string;
  deleteFile: (index: number) => void;
  isTouchDragStarted: boolean;
  setIsTouchDragStarted: Dispatch<SetStateAction<boolean>>;
  isScrollingStarted: boolean;
  scrollLeft: number;
}) {
  const { currentIndex, setCurrentIndex, files, setFilesNewOrder } =
    useCreateModalContext();
  const [itemIndex, setItemIndex] = useState(index);
  const { oldPosition, newPosition, isDragEnded } = draggingItem;
  const holdTimeout = useRef<NodeJS.Timeout | null>(null);

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
        setCurrentIndex(newPosition);
      }}
      onTouchStart={() => {
        if (holdTimeout.current) clearTimeout(holdTimeout.current);

        holdTimeout.current = setTimeout(() => {
          setDraggingItem({
            oldPosition: itemIndex,
            newPosition: itemIndex,
            isDragEnded: false,
          });
          if (!isScrollingStarted) {
            setIsTouchDragStarted(true);
          }
        }, 500);
      }}
      onTouchMove={(e) => {
        if (!isTouchDragStarted || isScrollingStarted) return;

        const touch = e.touches[0];
        const targetIndex = Math.floor((touch.clientX + scrollLeft) / 104);

        if (targetIndex !== oldPosition) {
          setDraggingItem((prev) => ({
            ...prev,
            newPosition:
              targetIndex < 0
                ? 0
                : targetIndex > files.files!.length - 1
                ? files.files!.length - 1
                : targetIndex,
          }));
        }
      }}
      onTouchEnd={() => {
        if (isScrollingStarted) return;

        if (holdTimeout.current) clearTimeout(holdTimeout.current);

        setDraggingItem((prev) => ({
          ...prev,
          isDragEnded: true,
        }));
        setIsTouchDragStarted(false);
        setCurrentIndex(newPosition);
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
          onClick={(e) => {
            deleteFile(index);
          }}
        >
          <IoIosClose size={36} className="text-base-100" />
        </button>
      )}
    </li>
  );
}
export default Media;
