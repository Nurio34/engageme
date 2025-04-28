import { CreateIcon } from "@/app/_globalComponents/Svg/SideMenuSvgs/CreateIcon";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleCreateModal } from "@/store/slices/modals";
import { setCurrentMenu } from "@/store/slices/sidemenu";
import { usePathname } from "next/navigation";

function Client() {
  const { currentMenu, isDrawerMenuOpen } = useAppSelector((s) => s.sideMenu);

  const dispatch = useAppDispatch();

  const path = usePathname().slice(1);

  return (
    <button
      className="w-full min-w-max flex items-center justify-center lg:justify-start gap-x-4 overflow-hidden
      hover:bg-base-content/10 rounded-lg md:p-[1.25vh] lg:p-3
      order-4 md:order-none
      "
      onClick={() => {
        if (currentMenu === "create") dispatch(setCurrentMenu(path));
        else dispatch(setCurrentMenu("create"));
        dispatch(toggleCreateModal());
      }}
    >
      <CreateIcon />
      {!isDrawerMenuOpen && (
        <span
          className={`hidden lg:block ${
            currentMenu === "create" ? "transition-all font-bold" : ""
          }`}
        >
          Create
        </span>
      )}
    </button>
  );
}
export default Client;
