import { useAppSelector } from "@/store/hooks";

function RecomendationsClient() {
  const { device } = useAppSelector((s) => s.modals);

  if (device !== "desktop") return;

  return <aside>RecomendationsClient</aside>;
}
export default RecomendationsClient;
