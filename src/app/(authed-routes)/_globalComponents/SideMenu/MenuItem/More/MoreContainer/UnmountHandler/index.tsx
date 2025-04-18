import { useAppDispatch } from "@/store/hooks";
import { toggleMoreModal } from "@/store/slices/modals";
import { setCurrentMenu } from "@/store/slices/sidemenu";
import { usePathname } from "next/navigation";

function UnmountHandler() {
  const dispatch = useAppDispatch();

  const path = usePathname().slice(1);

  return (
    <div
      className="fixed z-10 top-0 left-0 w-screen h-screen"
      onClick={() => {
        dispatch(toggleMoreModal());
        dispatch(setCurrentMenu(path));
      }}
    />
  );
}
export default UnmountHandler;
