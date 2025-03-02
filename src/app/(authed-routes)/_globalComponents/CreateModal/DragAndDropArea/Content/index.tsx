import { Dispatch, SetStateAction } from "react";
import { CiPlay1 } from "react-icons/ci";
import { HiOutlinePhotograph } from "react-icons/hi";
import { useCreateModalContext } from "../../Context";

function Content() {
  const { setFiles } = useCreateModalContext();

  return (
    <div className="flex flex-col items-center gap-y-[2vh]">
      <div className=" h-28">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <HiOutlinePhotograph
            size={64}
            className=" -translate-x-4 -translate-y-2 -rotate-12"
          />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className=" translate-x-4 translate-y-2 rotate-12
                border-4 border-base-content rounded-lg bg-base-100 w-14 aspect-square grid place-content-center
            "
          >
            <CiPlay1 size={40} />
          </div>
        </div>
      </div>
      <p className="text-2xl select-none">Drag photos and videos here</p>
      <label htmlFor="files" className="btn btn-info btn-sm text-base-100">
        Select from computer
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
  );
}
export default Content;
