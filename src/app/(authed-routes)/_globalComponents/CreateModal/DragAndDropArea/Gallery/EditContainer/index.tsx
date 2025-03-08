import { useCreateModalContext } from "../../../Context";
import { ContextProvider } from "./Context";
import Medias from "./Medias";

export type TransformationsType = {
  crop: string;
  width: number;
  height: number;
  x: number;
  y: number;
};

function EditContainer() {
  const { step, cloudinaryMedias } = useCreateModalContext();
  const { medias } = cloudinaryMedias;

  const renderCondition = step.step === "edit" && medias.length > 0;

  return (
    <>
      {renderCondition && (
        <ContextProvider>
          <Medias />
        </ContextProvider>
      )}
    </>
  );
}
export default EditContainer;
