import { useCreateModalContext } from "../../../Context";
import Canvas from "./Canvas";
import SliceIndicator from "./SliceIndicator";

function CropContainer() {
  const { step, files, cloudinaryMedias } = useCreateModalContext();
  const { medias } = cloudinaryMedias;

  const renderCondition1 = step.step === "crop";
  const renderCondition2 = step.step === "edit" && medias.length === 0;
  const renderCondition = renderCondition1 || renderCondition2;

  return (
    <>
      {renderCondition && (
        <>
          {files.urls?.map((url, index) => (
            <Canvas key={index} url={url} index={index} />
          ))}
          <SliceIndicator />
        </>
      )}
    </>
  );
}
export default CropContainer;
