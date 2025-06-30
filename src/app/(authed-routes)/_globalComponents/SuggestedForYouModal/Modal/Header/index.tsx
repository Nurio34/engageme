import CloseIcon from "@/app/_globalComponents/Svg/Close";
import { useAppDispatch } from "@/store/hooks";
import { toggleSuggestedForYouModalOpen } from "@/store/slices/modals";

function Header() {
  const dispatch = useAppDispatch();

  const toggleModal = () => dispatch(toggleSuggestedForYouModalOpen());

  return (
    <div className="px-4 pt-[14px] border-b">
      <div className="h-[43px] grid grid-cols-[48px_1fr_48px] items-center justify-items-center">
        <button type="button" onClick={toggleModal}>
          <CloseIcon />
        </button>
        <p className="font-semibold">Suggested For You</p>
      </div>
    </div>
  );
}
export default Header;
