import { useCreateModalContext } from "@/app/(authed-routes)/_globalComponents/CreateModal/Context";

function VideoInfo() {
  const { editedMedias, currentIndex } = useCreateModalContext();

  if (editedMedias.length === 0) return;

  const { type } = editedMedias[currentIndex];

  return (
    type === "video" && (
      <p className="px-4 py-2 text-xs text-base-content/70">
        Your reel will be shared with your followers in their feeds and can be
        seen on your profile. It may also appear in places like Reels, where
        anyone can see it.
      </p>
    )
  );
}
export default VideoInfo;
