import { PrismaRecomendationType } from "@/app/api/recomendation/handler/getRecomendations";
import Recomendation from "./Recomendation";
import { useRecomendationsContext } from "../Context";

function Recomendations({
  recomendations,
}: {
  recomendations: PrismaRecomendationType[];
}) {
  const { index, divWidth } = useRecomendationsContext();

  return (
    <ul
      className={`flex min-w-max gap-x-4 transition-all duration-500`}
      style={{ transform: `translateX(${-1 * index * divWidth}px)` }}
    >
      {recomendations.map((recomendation) => (
        <Recomendation
          key={recomendation.userId}
          recomendation={recomendation}
        />
      ))}
    </ul>
  );
}
export default Recomendations;
