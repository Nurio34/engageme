import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCurrentMenu } from "@/store/slices/sidemenu";
import { usePathname } from "next/navigation";
import { FaThreads } from "react-icons/fa6";

function Client() {
  const { currentMenu, isDrawerMenuOpen } = useAppSelector((s) => s.sideMenu);

  const dispatch = useAppDispatch();

  const path = usePathname().slice(1);

  return (
    <button
      className=" mt-auto w-full min-w-max hidden md:flex items-center justify-center lg:justify-start gap-x-4
      hover:bg-base-content/10 rounded-lg md:p-[1.25vh] lg:p-3
      "
      onClick={() => {
        if (currentMenu === "threads") dispatch(setCurrentMenu(path));
        else dispatch(setCurrentMenu("threads"));
      }}
    >
      <FaThreads size={24} />
      {!isDrawerMenuOpen && (
        <span
          className={`hidden lg:block ${
            currentMenu === "threads" ? "transition-all font-bold" : ""
          }`}
        >
          Threads
        </span>
      )}
    </button>
  );
}
export default Client;
