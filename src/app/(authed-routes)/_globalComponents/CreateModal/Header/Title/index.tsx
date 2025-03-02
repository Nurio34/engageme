import { useCreateModalContext } from "../../Context";

function Title() {
  const { step } = useCreateModalContext();

  return (
    <div>
      {step === "crop" ? "Crop" : step === "edit" ? "Edit" : "Create New Post"}
    </div>
  );
}
export default Title;
