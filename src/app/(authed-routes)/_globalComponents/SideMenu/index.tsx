import { getAllNotifications } from "@/app/actions/notification/getAllNotifications";
import ProviderComponent from "./Provider";

async function SideMenu() {
  const { status, allNotifications } = await getAllNotifications();

  if (status === "success")
    return <ProviderComponent allNotifications={allNotifications} />;
}
export default SideMenu;
