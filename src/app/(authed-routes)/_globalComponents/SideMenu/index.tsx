import ProviderComponent from "./Provider";
import { getRecommendations } from "@/app/api/recomendation/handler/getRecomendations";
import { getNotifications } from "@/app/api/notification/handler";

async function SideMenu() {
  const { status: notificationsStatus, allNotifications } =
    await getNotifications();
  const { status: recomendationsStatus, recomendations } =
    await getRecommendations();

  if (
    notificationsStatus === "success" &&
    recomendationsStatus === "success" &&
    recomendations
  )
    return (
      <ProviderComponent
        allNotifications={allNotifications}
        recomendations={recomendations}
      />
    );
}
export default SideMenu;
