import Chevron from "@/app/_globalComponents/Svg/Chevron";
import UsersIcon from "@/app/_globalComponents/Svg/UsersIcon";
import { useAppDispatch } from "@/store/hooks";
import { toggleSuggestedForYouModalOpen } from "@/store/slices/modals";
import Link from "next/link";

function DiscoverMoreAccounts() {
  const dispatch = useAppDispatch();

  const toggleModal = () => dispatch(toggleSuggestedForYouModalOpen());

  return (
    <Link
      href={"/explore/people"}
      className="py-2 px-4 cursor-pointer
          flex items-center justify-between gap-x-3
      "
      onClick={toggleModal}
    >
      <div
        className=" w-11 aspect-square border rounded-full
            flex items-center justify-center 
        "
      >
        <UsersIcon />
      </div>
      <div className="grow">
        <p className="text-sm font-semibold leading-[18px]">
          Discover more accounts
        </p>
        <p className="text-sm font-normal leading-[18px] text-base-content/50">
          See non-personalized suggestions
        </p>
      </div>
      <Chevron rotate={90} />
    </Link>
  );
}
export default DiscoverMoreAccounts;
