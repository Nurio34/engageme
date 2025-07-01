import SuggestedForYouList from "@/app/(authed-routes)/_globalComponents/SuggestedForYouList";
import { PrismaRecomendationType } from "@/app/api/recomendation/handler/getRecomendations";
import { useAppDispatch } from "@/store/hooks";
import { setCurrentMenu } from "@/store/slices/sidemenu";
import Link from "next/link";

function SuggestedForYouContainer({
  recomendations,
}: {
  recomendations: PrismaRecomendationType[];
}) {
  const dispatch = useAppDispatch();

  return (
    <div className="pt-6 pb-2">
      <div className="flex justify-between items-center px-4">
        <div className="text-sm font-semibold leading-4 text-base-content/70">
          Suggested For You
        </div>
        <Link
          href={"/explore/people"}
          onClick={() => dispatch(setCurrentMenu("explore"))}
          type="button"
          className="text-xs text-base-content font-medium transition-colors hover:text-base-content/70"
        >
          See All
        </Link>
      </div>
      <div className="py-2">
        <SuggestedForYouList
          recomendations={recomendations}
          maxWidth={1000}
          path="home"
        />
      </div>
    </div>
  );
}
export default SuggestedForYouContainer;
