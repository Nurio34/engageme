import { useAppSelector } from "@/store/hooks";

function RecomendationsClient() {
  const { isMobile } = useAppSelector((s) => s.modals);

  if (isMobile) return;

  return <aside>RecomendationsClient</aside>;
}
export default RecomendationsClient;
