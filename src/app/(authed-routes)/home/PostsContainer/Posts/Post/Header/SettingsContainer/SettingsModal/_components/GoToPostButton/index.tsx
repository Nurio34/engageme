import { useAppDispatch } from "@/store/hooks";
import { closePostSettingsModal } from "@/store/slices/modals";
import { started } from "@/store/slices/routing";
import { setCurrentMenu } from "@/store/slices/sidemenu";
import Link from "next/link";

function GoToPostButton({ postId }: { postId: string }) {
  const dispatch = useAppDispatch();

  return (
    <li className="py-1 h-12  border-b">
      <Link
        href={`/post/${postId}`}
        className="w-full h-full flex justify-center items-center"
        onClick={(e) => {
          e.stopPropagation();
          dispatch(started());
          dispatch(setCurrentMenu(""));
          dispatch(closePostSettingsModal());
        }}
        prefetch={true}
      >
        Go to post
      </Link>
    </li>
  );
}
export default GoToPostButton;
