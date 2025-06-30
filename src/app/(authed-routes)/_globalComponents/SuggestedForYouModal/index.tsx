import { getRecommendations } from "@/app/api/recomendation/handler/getRecomendations";
import ProviderComponent from "./Provider";

async function SuggestedForYouModal({ maxWidth }: { maxWidth: number }) {
  const { status, recomendations } = await getRecommendations();
  if (status === "fail" || !recomendations) return;

  return (
    <ProviderComponent recomendations={recomendations} maxWidth={maxWidth} />
  );
}
export default SuggestedForYouModal;
