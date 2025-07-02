import { PrismaRecomendationType } from "@/app/api/recomendation/handler/getRecomendations";
import Footer from "../../_globalComponents/Footer";
import SuggestedForYouList from "../../_globalComponents/SuggestedForYouList";

function Client({
  recomendations,
}: {
  recomendations: PrismaRecomendationType[];
}) {
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
export default Client;
