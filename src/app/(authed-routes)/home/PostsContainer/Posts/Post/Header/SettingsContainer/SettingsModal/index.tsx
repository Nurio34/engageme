import { useAppDispatch } from "@/store/hooks";
import { togglePostSettingsModal } from "@/store/slices/modals";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { PrismaPostType } from "../../../../../../../../../../prisma/types/post";
import { started } from "@/store/slices/routing";
import { setCurrentMenu } from "@/store/slices/sidemenu";
import FollowButton from "./_components/FollowButton";
import AddFavoritesButton from "./_components/AddFavoritesButton";

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

  const dispatch = useAppDispatch();

  const [isRender, setIsRender] = useState(!isModelOpen);
  const timeout = useRef<NodeJS.Timeout>(null);

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
        dispatch(togglePostSettingsModal());
      }}
    >
      <ul
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-base-100
            w-screen max-w-[400px] sm:rounded-3xl text-sm transition-all duration-500
            ${isRender ? "opacity-100 scale-100" : "opacity-0 scale-90"}
        `}
      >
        <li className="py-1 h-12 text-error font-bold border-b">
          <button
            type="button"
            className="w-full h-full flex justify-center items-center"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            Report xx
          </button>
        </li>
        <FollowButton userId={userId} followers={followers} />
        <AddFavoritesButton />
        <li className="py-1 h-12  border-b">
          <Link
            href={`/post/${postId}`}
            className="w-full h-full flex justify-center items-center"
            onClick={() => {
              dispatch(started());
              dispatch(setCurrentMenu(""));
            }}
            prefetch={true}
          >
            Go to post
          </Link>
        </li>
        <li className="py-1 h-12 border-b">
          <button
            type="button"
            className="w-full h-full flex justify-center items-center"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            Share to... xx
          </button>
        </li>
        <li className="py-1 h-12 border-b">
          <button
            type="button"
            className="w-full h-full flex justify-center items-center"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            Copy link xx
          </button>
        </li>
        <li className="py-1 h-12 border-b">
          <button
            type="button"
            className="w-full h-full flex justify-center items-center"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            Embed xx
          </button>
        </li>
        <li className="py-1 h-12 border-b">
          <button
            type="button"
            className="w-full h-full flex justify-center items-center"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            About this account xx
          </button>
        </li>
        <li className="py-1 h-12">
          <button
            type="button"
            className="w-full h-full flex justify-center items-center"
            onClick={(e) => {
              e.stopPropagation();
              setIsRender(false);
              setIsModelOpen(false);
            }}
          >
            Cancel
          </button>
        </li>
      </ul>
    </div>
  );
}
export default SettingsModal;
