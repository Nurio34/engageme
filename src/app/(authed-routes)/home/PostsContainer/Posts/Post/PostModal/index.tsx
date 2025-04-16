import { PrismaPostType } from "../../../../../../../../prisma/types/post";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import PostContainer from "./PostContainer";
import { usePreventRefresh } from "@/hooks/usePreventRefresh";
import { usePostsContext } from "../../Context";
import { setPostModal } from "@/store/slices/homePage";
import { useCustomNativeBackButton } from "./_hooks/useCustomNativeBackButton";

function PostModal({ post }: { post: PrismaPostType }) {
  const { postModal } = useAppSelector((s) => s.homePage);
  const { postId, isOpen } = postModal;
  usePreventRefresh(isOpen);
  useCustomNativeBackButton();

  const { device } = useAppSelector((s) => s.modals);
  const { type } = device;
  const isDesktop = type === "desktop";

  const dispatch = useAppDispatch();

  const { isFading, x, y } = usePostsContext();

  return (
    post.id === postId &&
    isOpen && (
      <div
        className={`fixed z-10 top-0 left-0 w-screen h-screen bg-base-content/70
          flex justify-start lg:justify-center items-start lg:items-center overflow-auto
          ${!isDesktop ? "cursor-grab" : ""}
          ${isFading || (x === 0 && y === 0) ? "transition-transform" : ""}
        `}
        onClick={() => {
          if (isDesktop) dispatch(setPostModal({ isOpen: false, postId: "" }));
        }}
        style={{
          transform: `translate(${x}px,${y}px)`,
        }}
      >
        <PostContainer post={post} />
      </div>
    )
  );
}
export default PostModal;
