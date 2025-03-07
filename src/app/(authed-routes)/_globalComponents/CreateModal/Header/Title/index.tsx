import { useCreateModalContext } from "../../Context";

function Title() {
  const { step, cloudinaryMedias } = useCreateModalContext();

  const { isLoading } = cloudinaryMedias;

  if (step.step === "crop")
    return <>{isLoading ? "Getting Ready .." : "Crop"}</>;

  if (step.step === "edit") {
    return <>{isLoading ? "Cropping Medias .." : "Edit"}</>;
  }

  if (step.step === "post" && isLoading) return "Editing ..";

  return "Create New Post";
}
export default Title;
