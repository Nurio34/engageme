function NoCommentsPlaceholder({ commentsAmount }: { commentsAmount: number }) {
  return (
    commentsAmount === 0 && (
      <div
        className="absolute top-0 left-0 w-full h-full
        text-5xl lg:text-7xl text-base-content/10 capitalize text-center font-serif
        grid place-content-center
    "
        style={{ fontVariant: "small-caps", lineHeight: 1.4 }}
      >
        There is no comment yet. Be the first to comment !
      </div>
    )
  );
}
export default NoCommentsPlaceholder;
