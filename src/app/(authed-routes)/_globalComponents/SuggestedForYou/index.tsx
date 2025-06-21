import { getRecommendations } from "@/app/api/recomendation/handler/getRecomendations";

async function SuggestedForYou({ maxWidth }: { maxWidth: number }) {
  const { status, recomendations } = await getRecommendations();
  if (status === "fail") return;

  console.log(recomendations);

  return (
    <div className="bg-green-300 w-screen" style={{ maxWidth }}>
      SuggestedForYou
    </div>
  );
}
export default SuggestedForYou;
