import { useAppDispatch } from "@/store/hooks";
import { toggleSuggestedForYouModalOpen } from "@/store/slices/modals";

function SeeAllButton() {
  const dispatch = useAppDispatch();

  const toggleModal = () => dispatch(toggleSuggestedForYouModalOpen());

  return (
    <button type="button" className="text-sm text-info" onClick={toggleModal}>
      See all
    </button>
  );
}
export default SeeAllButton;
