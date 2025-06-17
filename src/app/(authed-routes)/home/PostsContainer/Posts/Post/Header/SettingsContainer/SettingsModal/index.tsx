import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { togglePostSettingsModal } from "@/store/slices/modals";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PrismaPostType } from "../../../../../../../../../../prisma/types/post";
import { started } from "@/store/slices/routing";
import { setCurrentMenu } from "@/store/slices/sidemenu";

function SettingsModal({
  post,
  setIsModalOpen,
}: {
  post: PrismaPostType;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { id: postId } = post;

  const { isPostSettingsModalOpen } = useAppSelector((s) => s.modals);
  const dispatch = useAppDispatch();

  const [isRender, setIsRender] = useState(false);

  useEffect(() => {
    if (isPostSettingsModalOpen) setIsRender(true);
  }, [isPostSettingsModalOpen]);

  useEffect(() => {
    if (!isRender) {
      const timeoutId = setTimeout(() => {
        setIsModalOpen(false);
        dispatch(togglePostSettingsModal());
      }, 99);
      return () => clearTimeout(timeoutId);
    }
  }, [isRender]);

  return (
    <div
      className="fixed z-10 top-0 left-0 bg-base-content/40 w-screen h-screen overflow-hidden"
      onClick={() => {
        setIsRender(false);
      }}
    >
      <ul
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-base-100
            w-screen max-w-[400px] rounded-3xl text-sm transition-all
            ${isRender ? "opacity-100 scale-100" : "opacity-0 scale-75"}
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
        <li className="py-1 h-12 text-error font-bold border-b">
          <button
            type="button"
            className="w-full h-full flex justify-center items-center"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            Unfollow xx
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
            Add to favorites xx
          </button>
        </li>
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
