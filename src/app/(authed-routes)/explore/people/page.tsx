import { getRecommendations } from "@/app/api/recomendation/handler/getRecomendations";
import SuggestedForYouList from "../../_globalComponents/SuggestedForYouList";
import Footer from "../../_globalComponents/Footer";

async function ExplorePeoplePage() {
  const { status, recomendations } = await getRecommendations();
  if (status === "fail" || !recomendations) return;

  return (
    <main>
      <header className="md:pt-11 px-4 md:px-[68px]">
        <h1 className="font-bold h-11 flex items-center border-b">
          Suggested for you
        </h1>
      </header>
      <div className="py-4">
        <SuggestedForYouList
          maxWidth={600}
          recomendations={recomendations}
          path={"explore"}
        />
      </div>
      <Footer />
    </main>
  );
}
export default ExplorePeoplePage;
