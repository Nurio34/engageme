import Content from "./Content";
import Gallery from "./Gallery";
import { useCreateModalContext } from "../Context";
import toast from "react-hot-toast";

function DragAndDropArea() {
  const { files, setFiles } = useCreateModalContext();

  return (
    <div
      className="grow flex flex-col justify-center items-center"
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => {
        e.preventDefault();

        const Files = e.dataTransfer.files;
        const fileValues = Object.values(Files);

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
        if (fileValues.length !== 0) {
          toast.success(`New file${urls.length === 1 ? "'s" : "s'"} been add`);
        }
      }}
    >
      {files.files && files.files.length > 0 ? <Gallery /> : <Content />}
    </div>
  );
}
export default DragAndDropArea;
