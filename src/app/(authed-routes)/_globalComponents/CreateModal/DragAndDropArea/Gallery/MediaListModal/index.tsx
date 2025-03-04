import { useCreateModalContext } from "@/app/(authed-routes)/_globalComponents/CreateModal/Context";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { IoIosAddCircleOutline } from "react-icons/io";
import Media from "./Media";

export type DraggingItemType = {
  oldPosition: number;
  newPosition: number;
  isDragEnded: boolean;
};

export type FilesNewOrderType = { [key: number]: number };

function MediaListModal() {
  const {
    files,
    setFiles,
    canvasContainerSize,
    currentIndex,
    setCurrentIndex,
  } = useCreateModalContext();

  const LiRef = useRef<HTMLLIElement[]>([] as HTMLLIElement[]);

  const [draggingItem, setDraggingItem] = useState<DraggingItemType>({
    oldPosition: 0,
    newPosition: 0,
    isDragEnded: true,
  });

  const [filesNewOrder, setFilesNewOrder] = useState<FilesNewOrderType>({});

  useEffect(() => {
    if (Object.keys(filesNewOrder).length > 0) {
      console.log("reorder");
    }
  }, [filesNewOrder]);

  useEffect(() => {
    if (LiRef.current) {
      LiRef.current[currentIndex].scrollIntoView();
    }
  }, [currentIndex]);

  useEffect(() => {
    if (currentIndex === files.files!.length) {
      setCurrentIndex(files.files!.length - 1);
    }
  }, [files]);

  const deleteFile = (index: number) => {
    setFiles((prev) => ({
      files: prev.files && prev.files.filter((_, ind) => index !== ind),
      urls: prev.urls && prev.urls.filter((_, ind) => index !== ind),
    }));

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
          className="flex items-center overflow-x-auto grow"
          style={{
            maxWidth: canvasContainerSize.width - 132,
            scrollbarWidth: "thin",
          }}
        >
          <ul
            className="flex gap-2 items-center"
            onDrop={(e) => {
              e.stopPropagation();
            }}
          >
            {files.files &&
              files.files.map((file, index) => {
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
                    setFilesNewOrder={setFilesNewOrder}
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
