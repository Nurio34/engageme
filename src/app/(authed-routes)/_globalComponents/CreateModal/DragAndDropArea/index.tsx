import { useState } from "react";
import Content from "./Content";
import Gallery from "./Gallery";

export type FilesType = {
  files: FileList | null;
  urls: string[] | null;
};

function DragAndDropArea() {
  const [files, setFiles] = useState<FilesType>({
    files: null,
    urls: null,
  });

  return (
    <div
      className="grow flex flex-col justify-center items-center"
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        const fileValues = Object.values(files);
        const urls: string[] = [];
        fileValues.forEach((file) => {
          const url = URL.createObjectURL(file);
          urls.push(url);
        });
        setFiles({ files, urls });
      }}
    >
      {files.files ? (
        <Gallery files={files} />
      ) : (
        <Content setFiles={setFiles} />
      )}
    </div>
  );
}
export default DragAndDropArea;
