import { useCreateModalContext } from "../../Context";

function Title() {
  const { step, cloudinaryMedias, currentIndex } = useCreateModalContext();

  const { isLoading, medias } = cloudinaryMedias;

  if (step.step === "new") return "Create New Post";

  if (step.step === "crop")
    return <>{isLoading ? "Getting Ready .." : "Crop"}</>;

  if (step.step === "edit") {
    return <>{isLoading ? "Cropping Medias .." : "Edit"}</>;
  }

  if (step.step === "post" && isLoading) return "Editing ..";

  if (step.step === "sharing") return "Sharing";

  const { resource_type } = medias[currentIndex];
  return resource_type === "image" ? "Create New Post" : "New Reel";
}
export default Title;
