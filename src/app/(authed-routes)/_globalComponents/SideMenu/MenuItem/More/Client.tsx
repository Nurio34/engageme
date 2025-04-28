import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleMoreModal } from "@/store/slices/modals";
import { setCurrentMenu } from "@/store/slices/sidemenu";
import { usePathname } from "next/navigation";
import { IoIosMenu } from "react-icons/io";
import MoreContainer from "./MoreContainer";

function Client() {
  const { currentMenu, isDrawerMenuOpen } = useAppSelector((s) => s.sideMenu);

  const dispatch = useAppDispatch();

  const path = usePathname().slice(1);
  return (
    <div>
      <button
        className="w-full min-w-max hidden md:flex items-center justify-center lg:justify-start gap-x-4 overflow-hidden
      hover:bg-base-content/10 rounded-lg md:p-[1.25vh] lg:p-3
      "
        onClick={() => {
          if (currentMenu === "more") dispatch(setCurrentMenu(path));
          else dispatch(setCurrentMenu("more"));
          dispatch(toggleMoreModal());
        }}
      >
        <IoIosMenu size={24} />
        {!isDrawerMenuOpen && (
          <span
            className={`hidden lg:block ${
              currentMenu === "more" ? "transition-all font-bold" : ""
            }`}
          >
            More
          </span>
        )}
      </button>
      <MoreContainer />
    </div>
  );
}
export default Client;
