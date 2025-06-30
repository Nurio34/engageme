import { getRecommendations } from "@/app/api/recomendation/handler/getRecomendations";
import SuggestedForYouList from "../../_globalComponents/SuggestedForYouList";

async function ExplorePeoplePage() {
  const { status, recomendations } = await getRecommendations();
  if (status === "fail" || !recomendations) return;

  return (
    <SuggestedForYouList
      maxWidth={600}
      recomendations={recomendations}
      path={"explore"}
    />
  );
}
export default ExplorePeoplePage;
