import { useEffect, useState } from "react";
import { useCreateModalContext } from "../../../Context";
import MediaContainer from "./MediaContainer";
import EditTab from "./EditTab";

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
    renderCondition && (
      <div className="w-full h-full md:flex">
        {editedMedias.map((media, index) => (
          <MediaContainer key={media.publicId} media={media} index={index} />
        ))}
        <EditTab />
      </div>
    )
  );
}
export default CreateNewPostContainer;
