import { getRecommendations } from "@/app/api/recomendation/handler/getRecomendations";
import ProviderComponent from "./Provider";

async function SuggestedForYou({ maxWidth }: { maxWidth: number }) {
  const { status, recomendations } = await getRecommendations();

  if (status === "fail" || !recomendations) return;

  const mockArray = [
    ...recomendations,
    ...recomendations,
    ...recomendations,
    ...recomendations,
  ];
  mockArray.length = 17;
  return (
    <ProviderComponent maxWidth={maxWidth} recomendations={recomendations} />
  );
}
export default SuggestedForYou;
