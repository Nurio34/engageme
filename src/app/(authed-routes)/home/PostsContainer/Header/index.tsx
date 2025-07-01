import { PrismaRecomendationType } from "@/app/api/recomendation/handler/getRecomendations";
import ProviderComponent from "./Provider";

function Header({
  recomendations,
}: {
  recomendations: PrismaRecomendationType[];
}) {
  return <ProviderComponent recomendations={recomendations} />;
}
export default Header;
