import GradientCircle from "@/app/_globalComponents/LoadingComponents/GradientCircle";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { started } from "@/store/slices/routing";
import { setCurrentMenu } from "@/store/slices/sidemenu";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

function Client() {
  const { username, avatar } = useAppSelector((s) => s.user);
  const { currentMenu, isDrawerMenuOpen } = useAppSelector((s) => s.sideMenu);

  const dispatch = useAppDispatch();

  const path = usePathname().slice(1);

  useEffect(() => {
    if (path === username) dispatch(setCurrentMenu(username));
  }, [path]);

  return (
    <Link
      href={`/${username}`}
      className="w-full min-w-max flex items-center justify-center lg:justify-start gap-x-4
        p-3 md:p-[1.25vh] lg:p-3 rounded-lg order-6 md:order-none
        hover:bg-base-content/10
      "
      onClick={() => {
        if (currentMenu !== username && path !== username) dispatch(started());
        dispatch(setCurrentMenu(username));
      }}
    >
      <div className="relative w-6 aspect-square">
        {currentMenu === username && <GradientCircle width={24} inset={1} />}

        <figure className="absolute top-[2px] left-[2px] w-5 aspect-square rounded-full overflow-hidden">
          <Image
            src={avatar || "/placeholders/avatar.webp"}
            fill
            alt={`avatar of ${username}`}
            sizes="50vw"
          />
        </figure>
      </div>
      {!isDrawerMenuOpen && (
        <span
          className={`hidden lg:block ${
            currentMenu === username ? "transition-all font-bold" : ""
          }`}
        >
          {username || "Profile"}
        </span>
      )}
    </Link>
  );
}
export default Client;
