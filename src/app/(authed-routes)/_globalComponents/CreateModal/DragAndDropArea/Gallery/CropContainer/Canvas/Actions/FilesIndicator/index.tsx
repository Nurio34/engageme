import { useCreateModalContext } from "@/app/(authed-routes)/_globalComponents/CreateModal/Context";

function FilesIndicator() {
  const { currentIndex, files } = useCreateModalContext();

  const areMoreThanOneFile = files.files && files.files.length > 1;

  return (
    <>
      {areMoreThanOneFile && (
        <div className="flex justify-center items-center gap-x-[0.5vw]">
          {files.files &&
            files.files.map((_, index) => (
              <button
                key={index}
                className={`w-2 aspect-square rounded-full
                ${
                  currentIndex === index
                    ? "bg-info -scale-x-125"
                    : "bg-base-300"
                }  
              `}
              ></button>
            ))}
        </div>
      )}
    </>
  );
}
export default FilesIndicator;
