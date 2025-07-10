import { useAppSelector } from "@/store/hooks";
import { useCreateModalContext } from "../../Context";
import { useEffect, useState } from "react";

function Title() {
  const { isEditing } = useAppSelector((s) => s.postEdit);
  const { step, cloudinaryMedias, editedMedias, currentIndex, isShared } =
    useCreateModalContext();

  const [type, setType] = useState("image");

  useEffect(() => {
    if (isEditing) setType(editedMedias[currentIndex].type);
    else setType(cloudinaryMedias.medias[0]?.resource_type);
  }, [isEditing, editedMedias, cloudinaryMedias, step]);

  const { isLoading } = cloudinaryMedias;

  if (step.step === "new") return "Create New Post";

  if (step.step === "crop")
    return <>{isLoading ? "Getting Ready .." : "Crop"}</>;

  if (step.step === "edit") {
    return <>{isLoading ? "Cropping Medias .." : "Edit"}</>;
  }

  if (step.step === "post" && isLoading) return "Editing ..";

  if (step.step === "sharing")
    return isShared ? "Post Shared" : isEditing ? "Editing" : "Sharing";

  return isEditing
    ? "Edit info"
    : type === "image"
    ? "Create New Post"
    : "New Reel";
}
export default Title;
