function NoCommentsPlaceholder({ commentsAmount }: { commentsAmount: number }) {
  return (
    commentsAmount === 0 && (
      <div className="absolute top-0 left-0 w-full h-full grid place-content-center gap-y-1 text-center">
        <p className="text-2xl font-bold">No comments yet.</p>
        <p>Start the conversation.</p>
      </div>
    )
  );
}
export default NoCommentsPlaceholder;
