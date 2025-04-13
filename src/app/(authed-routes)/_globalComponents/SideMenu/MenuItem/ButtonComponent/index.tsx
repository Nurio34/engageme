import { MenuType } from "../..";
import { AppDispatch } from "@/store";
import Container from "./Container";
import MoreContainer from "../_components/MoreContainer";

function ButtonComponent({
  item,
  action,
  isCurrentPath,
}: {
  item: MenuType;
  action: (dispatch: AppDispatch) => void;
  isCurrentPath: boolean;
}) {
  return (
    <Container item={item} action={action} isCurrentPath={isCurrentPath}>
      {item.name === "More" && <MoreContainer />}
    </Container>
  );
}
export default ButtonComponent;
