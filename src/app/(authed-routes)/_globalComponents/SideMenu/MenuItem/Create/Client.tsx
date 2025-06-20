import { CreateIcon } from "@/app/_globalComponents/Svg/SideMenuSvgs/CreateIcon";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleCreateModal } from "@/store/slices/modals";
import { setCurrentMenu } from "@/store/slices/sidemenu";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";

function Client() {
  const { currentMenu, isDrawerMenuOpen } = useAppSelector((s) => s.sideMenu);
  const { username } = useAppSelector((s) => s.user);

  const dispatch = useAppDispatch();

  const path = usePathname()?.slice(1);

  return (
    <button
      className="w-full min-w-max flex items-center justify-center lg:justify-start gap-x-4 overflow-hidden
         
       
      p-3 md:p-[1.25vh] lg:p-3 rounded-lg order-4 md:order-none
        hover:bg-base-content/10
      "
      onClick={() => {
        if (!username) return toast.error("You should login to create post!");
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
