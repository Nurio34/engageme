import { useAppDispatch } from "@/store/hooks";
import { toggleMoreModal } from "@/store/slices/modals";

function UnmountHandler() {
  const dispatch = useAppDispatch();

  return (
    <div
      className="fixed z-10 top-0 left-0 w-screen h-screen"
      onClick={() => dispatch(toggleMoreModal())}
    />
  );
}
export default UnmountHandler;
