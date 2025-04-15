function TotalReplies({ totalReplies }: { totalReplies: number }) {
  return <p className="text-xs text-base-content/70">{`(${totalReplies})`}</p>;
}
export default TotalReplies;
