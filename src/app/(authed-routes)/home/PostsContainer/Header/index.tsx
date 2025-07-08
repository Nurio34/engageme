import { PrismaRecomendationType } from "../../../../../../prisma/types/recomendation";
import ProviderComponent from "./Provider";

function Header({
  recomendations,
}: {
  recomendations: PrismaRecomendationType[];
}) {
  return <ProviderComponent recomendations={recomendations} />;
}
export default Header;
