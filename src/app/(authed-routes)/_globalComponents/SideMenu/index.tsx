import { getAllNotifications } from "@/app/actions/notification/getAllNotifications";
import ProviderComponent from "./Provider";

async function SideMenu() {
  const { allNotifications } = await getAllNotifications();

  return <ProviderComponent allNotifications={allNotifications} />;
}
export default SideMenu;
