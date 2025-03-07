import { useCreateModalContext } from "../../../Context";
import { ContextProvider } from "./Context";
import EditTab from "./EditTab";
import Medias from "./Medias";

function EditContainer() {
  const { step, cloudinaryMedias } = useCreateModalContext();
  const { isLoading, medias } = cloudinaryMedias;

  const renderCondition = step.step === "edit" && medias.length > 0;

  return (
    <>
      {renderCondition && (
        <ContextProvider>
          <div className="h-full flex">
            <Medias />
            <EditTab />
          </div>
        </ContextProvider>
      )}
    </>
  );
}
export default EditContainer;
