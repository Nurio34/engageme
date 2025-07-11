import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closePostSettingsModal } from "@/store/slices/modals";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { PrismaPostType } from "../../../../../../../../../../prisma/types/post";
import FollowButton from "./_components/FollowButton";
import AddFavoritesButton from "./_components/AddFavoritesButton";
import { usePathname } from "next/navigation";
import CopyLinkButton from "./_components/CopyLinkButton";
import GoToPostButton from "./_components/GoToPostButton";
import ReportButton from "./_components/ReportButton";
import CancelButton from "./_components/CancelButton";
import ShareToButton from "./_components/ShareToButton";
import EmbedButton from "./_components/EmbedButton";
import AboutThisAccountButton from "./_components/AboutThisAccountButton";
import DeletePostButton from "./_components/DeletePostButton";
import HideCountsButton from "./_components/HideCountsButton";
import TurnOffCommentingButton from "./_components/TurnOffCommentingButton";
import EditButton from "./_components/EditButton";

function SettingsModal({
  isModelOpen,
  setIsModelOpen,
  post,
}: {
  isModelOpen: boolean;
  setIsModelOpen: Dispatch<SetStateAction<boolean>>;
  post: PrismaPostType;
}) {
  const { id: postId, userId, user } = post;
  const { followers } = user;

  const { id } = useAppSelector((s) => s.user);
  const dispatch = useAppDispatch();

  const [isRender, setIsRender] = useState(!isModelOpen);
  const timeout = useRef<NodeJS.Timeout>(null);

  const path = usePathname();
  const isPostPage = path.includes("post");
  const isSelfPost = id === userId;

  useEffect(() => {
    if (isModelOpen) setIsRender(true);
    else setIsRender(false);

    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, [isModelOpen]);

  return (
    <div
      className="fixed z-10 top-0 left-0 bg-base-content/70 w-screen h-screen overflow-hidden"
      onClick={() => {
        setIsModelOpen(false);
        dispatch(closePostSettingsModal());
        history.back();
      }}
    >
      <ul
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-base-100
            w-screen max-w-[400px] sm:rounded-3xl text-sm transition-all duration-500
            ${isRender ? "opacity-100 scale-100" : "opacity-0 scale-90"}
        `}
      >
        {isSelfPost && <DeletePostButton userId={id} postId={postId} />}
        {isSelfPost && <EditButton post={post} />}
        {isSelfPost && <HideCountsButton />}
        {isSelfPost && <TurnOffCommentingButton />}
        {!isSelfPost && <ReportButton />}
        {!isSelfPost && <FollowButton userId={userId} followers={followers} />}
        {!isSelfPost && <AddFavoritesButton userId={userId} />}
        {!isPostPage && <GoToPostButton postId={postId} />}
        <ShareToButton />
        <CopyLinkButton postId={postId} />
        <EmbedButton />
        <AboutThisAccountButton />
        <CancelButton
          setIsRender={setIsRender}
          setIsModelOpen={setIsModelOpen}
        />
      </ul>
    </div>
  );
}
export default SettingsModal;
