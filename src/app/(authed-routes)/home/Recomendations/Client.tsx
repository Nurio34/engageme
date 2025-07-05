import { PrismaRecomendationType } from "@/app/api/recomendation/handler/getRecomendations";
import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import SwitchAccounts from "./_components/SwitchAccounts";
import SuggestedForYouContainer from "./_components/SuggestedForYouContainer";
import Footer from "../../_globalComponents/Footer";

function RecomendationsClient({
  recomendations,
}: {
  recomendations: PrismaRecomendationType[];
}) {
  const { device } = useAppSelector((s) => s.modals);
  const { type } = device;
  const { id } = useAppSelector((s) => s.user);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (type === "desktop") setIsMounted(true);
    else setIsMounted(false);
  }, [type]);

  return (
    isMounted && (
      <aside className="hidden xl:block pl-16 pt-9">
        {id && <SwitchAccounts />}
        <SuggestedForYouContainer recomendations={recomendations} />
        <Footer />
      </aside>
    )
  );
}
export default RecomendationsClient;
