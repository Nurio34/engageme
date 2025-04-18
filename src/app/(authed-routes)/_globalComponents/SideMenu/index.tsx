import { getAllNotifications } from "@/app/actions/notification/getAllNotifications";
import ProviderComponent from "./Provider";

async function SideMenu() {
  const { status, allNotifications } = await getAllNotifications();
  console.log(allNotifications);

  if (status === "fail" || !allNotifications) return;

  return <ProviderComponent allNotifications={allNotifications} />;
}
export default SideMenu;
