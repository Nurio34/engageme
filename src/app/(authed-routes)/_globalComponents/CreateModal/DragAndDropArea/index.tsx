import { useEffect, useState } from "react";
import Content from "./Content";
import Gallery from "./Gallery";
import { useCreateModalContext } from "../Context";

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
        const files = e.dataTransfer.files;
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
      }}
    >
      {files.files ? <Gallery /> : <Content />}
    </div>
  );
}
export default DragAndDropArea;
