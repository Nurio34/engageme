function PostButton({ comment }: { comment: string }) {
  return (
    comment && (
      <button type="submit" className="font-semibold text-info">
        Post
      </button>
    )
  );
}
export default PostButton;
