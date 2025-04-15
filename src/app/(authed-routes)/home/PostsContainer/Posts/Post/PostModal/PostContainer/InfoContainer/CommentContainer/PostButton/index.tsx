function PostButton({
  comment,
  isPending,
}: {
  comment: string;
  isPending: boolean;
}) {
  return (
    comment && (
      <button
        type="submit"
        className="font-semibold text-info"
        disabled={isPending}
      >
        Post
      </button>
    )
  );
}
export default PostButton;
