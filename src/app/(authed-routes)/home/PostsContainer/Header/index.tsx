import { PrismaRecomendationType } from "../../../../../../prisma/types/recomendation";
import ProviderComponent from "./Provider";

function Header({
  recomendations,
  variant,
}: {
  recomendations: PrismaRecomendationType[];
  variant: string | undefined;
}) {
  return (
    <ProviderComponent recomendations={recomendations} variant={variant} />
  );
}
export default Header;
