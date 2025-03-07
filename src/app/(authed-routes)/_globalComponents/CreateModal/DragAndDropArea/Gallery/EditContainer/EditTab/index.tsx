import { useEditContext } from "../Context";

function EditTab() {
  const { count } = useEditContext();

  return <div>EditTab</div>;
}
export default EditTab;
