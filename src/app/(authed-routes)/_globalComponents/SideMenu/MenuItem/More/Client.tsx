import MoreContainer from "./MoreContainer";
import SwitchAppearanceContainer from "./SwitchAppearanceContainer";
import ToggleMoreContainerButton from "./ToggleMoreContainerButton";

function Client() {
  return (
    <div className="relative">
      <ToggleMoreContainerButton />
      <MoreContainer />
      <SwitchAppearanceContainer />
    </div>
  );
}
export default Client;
