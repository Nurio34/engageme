import { useEffect, useState } from "react";
import { useCreateModalContext } from "../../../Context";
import MediaContainer from "./MediaContainer";

function CreateNewPostContainer() {
  const { step, editedMedias } = useCreateModalContext();

  const [isRender, setIsRender] = useState(true);

  useEffect(() => {
    if (isRender) setIsRender(false);
  }, [editedMedias]);

  useEffect(() => {
    if (!isRender) setIsRender(true);
  }, [isRender]);

  const renderCondition = step.step === "post" && isRender;

  return (
    renderCondition &&
    editedMedias.map((media, index) => (
      <MediaContainer key={media.publicId} media={media} index={index} />
    ))
  );
}
export default CreateNewPostContainer;
