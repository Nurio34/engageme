import { getRecommendations } from "@/app/api/recomendation/handler/getRecomendations";
import ProviderComponent from "./Provider";

async function ExplorePeoplePage() {
  const { status, recomendations } = await getRecommendations();
  if (status === "fail" || !recomendations) return;

  return <ProviderComponent recomendations={recomendations} />;
}
export default ExplorePeoplePage;
