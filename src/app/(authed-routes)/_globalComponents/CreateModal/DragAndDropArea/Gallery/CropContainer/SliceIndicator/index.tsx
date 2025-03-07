import { useCreateModalContext } from "../../../../Context";

function SliceIndicator() {
  const { isResizingStarted, step } = useCreateModalContext();

  const totalSlices = Array(9).fill("#");

  return (
    <>
      {isResizingStarted && (
        <div
          className="absolute top-0 left-0 w-full h-full  pointer-events-none
        grid grid-cols-3 grid-rows-3
    "
        >
          {totalSlices.map((_, index) => (
            <div
              key={index}
              className={`border-r border-b
            ${index % 3 === 2 ? "border-r-0" : ""}
            ${index > 5 ? "border-b-0" : ""}
        `}
            ></div>
          ))}
        </div>
      )}
    </>
  );
}
export default SliceIndicator;
