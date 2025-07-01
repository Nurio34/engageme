import { getAllNotifications } from "@/app/actions/notification/getAllNotifications";
import ProviderComponent from "./Provider";
import { getRecommendations } from "@/app/api/recomendation/handler/getRecomendations";

async function SideMenu() {
  const { status: notificationsStatus, allNotifications } =
    await getAllNotifications();
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
