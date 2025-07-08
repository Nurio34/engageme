import { getRecommendations } from "@/app/api/recomendation/handler/getRecomendations";
import ProviderComponent from "./Provider";

async function Recomendations() {
  const { status, recomendations } = await getRecommendations();

  if (status === "fail" || !recomendations) return <div>Error</div>;

  return <ProviderComponent recomendations={recomendations} />;
}

export default Recomendations;
