import { useCreateModalContext } from "@/app/(authed-routes)/_globalComponents/CreateModal/Context";
import Image from "next/image";

function MediaListModal() {
  const { files, canvasContainerSize } = useCreateModalContext();

  return (
    <div className="absolute bottom-full right-0 mb-2 text-base-100/50 rounded-md">
      <div
        className="p-2 rounded-md bg-base-content/70 overflow-x-auto
          flex items-center gap-2 
        "
        style={{
          maxWidth: canvasContainerSize.width - 32,
        }}
      >
        <ul className="flex gap-2 items-center ">
          {files.files &&
            files.files.map((file, index) => {
              const fileType = file.type.split("/")[0];
              const url = files.urls![index];

              if (fileType === "image") {
                return (
                  <li
                    key={index}
                    className="relative w-24 aspect-square rounded-md overflow-hidden cursor-pointer select-none"
                  >
                    <Image
                      src={url}
                      fill
                      alt="image"
                      className="object-cover pointer-events-none"
                      priority
                      sizes="100vw"
                    />
                  </li>
                );
              }
            })}
        </ul>
      </div>
    </div>
  );
}
export default MediaListModal;
