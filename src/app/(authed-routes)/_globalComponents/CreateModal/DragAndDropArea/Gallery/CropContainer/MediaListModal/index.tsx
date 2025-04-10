import {
  FilesNewOrderType,
  useCreateModalContext,
} from "@/app/(authed-routes)/_globalComponents/CreateModal/Context";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { IoIosAddCircleOutline } from "react-icons/io";
import Media from "./Media";

export type DraggingItemType = {
  oldPosition: number;
  newPosition: number;
  isDragEnded: boolean;
};

function MediaListModal() {
  const {
    files,
    setFiles,
    canvasContainerSize,
    currentIndex,
    setCurrentIndex,
    filesNewOrder,
    setFilesNewOrder,
  } = useCreateModalContext();

  const LiRef = useRef<HTMLLIElement[] | null[]>([] as HTMLLIElement[]);

  const [draggingItem, setDraggingItem] = useState<DraggingItemType>({
    oldPosition: 0,
    newPosition: 0,
    isDragEnded: false,
  });

  //! *** to fix the reordering issue after drag complate ***
  const [isReset, setIsReset] = useState(false);

  useEffect(() => {
    if (draggingItem.isDragEnded) {
      setIsReset(true);
    }
  }, [draggingItem.isDragEnded]);

  useEffect(() => {
    if (isReset) {
      setIsReset(false);
    }
  }, [isReset]);
  //! ******************

  //! *** handle mobile touch events ***
  const ScrollableContainerRef = useRef<HTMLDivElement | null>(null);
  const ScrollableUlRef = useRef<HTMLUListElement | null>(null);
  const [isTouchDragStarted, setIsTouchDragStarted] = useState(false);
  const [isScrollingStarted, setIsScrollingStarted] = useState(false);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (isTouchDragStarted) {
        e.preventDefault();
      }
    };

    const handleScroll = () => {
      setIsScrollingStarted(true);
      if (ScrollableContainerRef.current) {
        setScrollLeft(ScrollableContainerRef.current.scrollLeft);
      }
    };
    const handleScrollEnd = () => {
      setIsScrollingStarted(false);
      setIsTouchDragStarted(false);
    };

    if (ScrollableContainerRef.current) {
      ScrollableContainerRef.current.addEventListener(
        "touchmove",
        handleTouchMove,
        { passive: false }
      );
      ScrollableContainerRef.current.addEventListener("scroll", handleScroll);
      ScrollableContainerRef.current.addEventListener(
        "scrollend",
        handleScrollEnd
      );
    }

    return () => {
      if (ScrollableContainerRef.current) {
        ScrollableContainerRef.current.removeEventListener(
          "touchmove",
          handleTouchMove
        );
        ScrollableContainerRef.current.removeEventListener(
          "scroll",
          handleScroll
        );
        ScrollableContainerRef.current.removeEventListener(
          "scrollend",
          handleScrollEnd
        );
      }
    };
  }, [isTouchDragStarted, isTouchDragStarted]);
  //! *******************************************************

  useEffect(() => {
    if (Object.keys(filesNewOrder).length !== files.files?.length) return;

    const updatedFiles = Array(files.files!.length).fill("#");
    const updatedUrls = Array(files.files!.length).fill("#");
    Object.entries(filesNewOrder).forEach(([oldLine, newLine]) => {
      const file = files.files![+oldLine];
      updatedFiles[newLine] = file;

      const url = files.urls![+oldLine];
      updatedUrls[newLine] = url;
    });
    setFiles({ files: updatedFiles, urls: updatedUrls });
  }, [filesNewOrder]);

  useEffect(() => {
    if (currentIndex === files.files!.length) {
      setCurrentIndex(files.files!.length - 1);
    }

    if (Object.keys(filesNewOrder).length === files.files?.length) return;

    const updatedFilesOrder: FilesNewOrderType = {};
    if (files.files && files.files.length) {
      for (let index = 0; index < files.files.length; index++) {
        updatedFilesOrder[index] = index;
        setFilesNewOrder(updatedFilesOrder);
      }
    } else {
      setFilesNewOrder({});
    }
  }, [files]);

  useEffect(() => {
    if (LiRef.current.length !== 0) {
      LiRef.current[currentIndex]?.scrollIntoView({ inline: "center" });
    }
  }, [currentIndex]);

  const deleteFile = (index: number) => {
    setFiles((prev) => {
      const files = prev.files && prev.files.filter((_, ind) => index !== ind);
      const urls = prev.urls && prev.urls.filter((_, ind) => index !== ind);

      return { files, urls };
    });
    toast.success("File's been deleted successfully");
  };

  return (
    <div className="absolute bottom-full right-0 mb-2 text-base-100/50 rounded-md">
      <div
        className="p-2 rounded-md bg-base-content/70 flex"
        style={{
          maxWidth: canvasContainerSize.width - 32,
        }}
      >
        <div
          ref={ScrollableContainerRef}
          className="flex items-center overflow-x-auto grow"
          style={{
            maxWidth: canvasContainerSize.width - 132,
          }}
        >
          <ul
            ref={ScrollableUlRef}
            className="flex gap-2 items-center"
            onDrop={(e) => {
              e.stopPropagation();
            }}
          >
            {!isReset &&
              files.files?.map((file, index) => {
                const fileType = file.type.split("/")[0];
                const url = files.urls![index];

                return (
                  <Media
                    key={index}
                    LiRef={LiRef}
                    index={index}
                    draggingItem={draggingItem}
                    setDraggingItem={setDraggingItem}
                    fileType={fileType}
                    url={url}
                    deleteFile={deleteFile}
                    isTouchDragStarted={isTouchDragStarted}
                    setIsTouchDragStarted={setIsTouchDragStarted}
                    isScrollingStarted={isScrollingStarted}
                    scrollLeft={scrollLeft}
                  />
                );
              })}
          </ul>
        </div>

        <label
          htmlFor="files"
          className="flex items-center justify-center w-24 cursor-pointer"
        >
          <IoIosAddCircleOutline size={40} />
          <input
            onChange={(e) => {
              const files = e.target.files;

              if (files && files.length) {
                const fileValues = Object.values(files);
                const urls: string[] = [];
                fileValues.forEach((file) => {
                  const url = URL.createObjectURL(file);
                  urls.push(url);
                });
                setFiles((prev) => {
                  if (prev.files === null || prev.urls === null) {
                    return { files: fileValues, urls };
                  }

                  return {
                    files: [...prev.files, ...fileValues],
                    urls: [...prev.urls, ...urls],
                  };
                });
                toast.success(
                  `New file${urls.length === 1 ? "'s" : "s'"} been add`
                );
              }
            }}
            type="file"
            name="files"
            id="files"
            multiple
            hidden
          />
        </label>
      </div>
    </div>
  );
}
export default MediaListModal;
