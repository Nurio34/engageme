import { useAppSelector } from "@/store/hooks";
import toast from "react-hot-toast";
import { FaCircleInfo, FaThreads } from "react-icons/fa6";

function Client() {
  const { currentMenu, isDrawerMenuOpen } = useAppSelector((s) => s.sideMenu);

  return (
    <button
      className=" mt-auto w-full min-w-max hidden md:flex items-center justify-center lg:justify-start gap-x-4 overflow-hidden
      hover:bg-base-content/10 rounded-lg md:p-[1.25vh] lg:p-3
      "
      // onClick={() => {
      //   if (currentMenu === "threads") dispatch(setCurrentMenu(path));
      //   else dispatch(setCurrentMenu("threads"));
      // }}
      onClick={(e) => {
        e.stopPropagation();
        toast("This feature is under development !", {
          className: "text-center",
          icon: <FaCircleInfo className="text-4xl text-info" />,
        });
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
