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

  const { isFading, x, y, isDragging, setPointer } = usePostsContext();

  return (
    post.id === postId &&
    isOpen && (
      <div
        className={`fixed z-10 top-0 left-0 w-screen h-screen bg-base-content/70
          flex justify-start lg:justify-center items-start lg:items-center overflow-auto
          ${isFading || (x === 0 && y === 0) ? "transition-transform" : ""}
          ${isDragging || isFading ? "overflow-hidden opacity-70" : ""}
        `}
        style={{
          transform: `translate(${x}px,${y}px)`,
        }}
        onClick={() => {
          if (isDesktop) dispatch(setPostModal({ isOpen: false, postId: "" }));
        }}
        onMouseMove={(e) => {
          if (isDragging)
            setPointer((prev) => ({
              ...prev,
              end_x: e.clientX,
              end_y: e.clientY,
            }));
        }}
        onMouseUp={() => {
          setPointer((prev) => ({
            ...prev,
            isDragging: false,
          }));
        }}
        onTouchMove={(e) => {
          const { clientX, clientY } = e.touches[0];

          if (isDragging)
            setPointer((prev) => ({
              ...prev,
              end_x: clientX,
              end_y: clientY,
            }));
        }}
        onTouchEnd={() => {
          setPointer((prev) => ({
            ...prev,
            isDragging: false,
          }));
        }}
      >
        <PostContainer post={post} />
      </div>
    )
  );
}
export default PostModal;
