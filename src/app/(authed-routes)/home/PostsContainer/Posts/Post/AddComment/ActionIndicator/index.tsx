import Loading from "@/app/_globalComponents/LoadingComponents/Loading";

function ActionIndicator({ isPending }: { isPending: boolean }) {
  return (
    isPending && (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loading size={10} />
      </div>
    )
  );
}
export default ActionIndicator;
