function FollowButton({ userId }: { userId: string }) {
  return (
    <button
      type="button"
      className="w-full border-t text-center text-sm py-3 text-info font-medium underline-offset-2 hover:underline"
    >
      Follow
    </button>
  );
}
export default FollowButton;
