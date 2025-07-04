import { useCatagorizedNotifications } from "@/app/(authed-routes)/_globalComponents/SideMenu/DrawerMenu/NotificationsDrawer/_hooks/useCatagorizedNotifications";
import { useAnimatedMount } from "@/hooks/useAnimatedMount";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCurrentMenu } from "@/store/slices/sidemenu";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import CatagorizedNotifications from "./CatagorizedNotifications";
import ActivityOnYourPostsIcon from "@/app/_globalComponents/Svg/Act";
import SuggestedForYouList from "@/app/(authed-routes)/_globalComponents/SuggestedForYouList";
import { PrismaRecomendationType } from "@/app/api/recomendation/handler/getRecomendations";
import Link from "next/link";

function NotificationsDrawer({
  recomendations,
}: {
  recomendations: PrismaRecomendationType[];
}) {
  const { isDrawerMenuOpen } = useAppSelector((s) => s.sideMenu);

  const dispatch = useAppDispatch();

  const path = usePathname()?.slice(1);

  const { isMounted, style } = useAnimatedMount(isDrawerMenuOpen, "translateX");

  const { catagorizedNotifications } = useCatagorizedNotifications();

  const isAnyNotification = catagorizedNotifications.some(
    (notification) => notification.notifications.length > 0
  );

  const ScrollableContainerRef = useRef<HTMLDivElement | null>(null);

  //! *** push history state when "isCreateModalOpen === true" ( for mobile native back button manipulation ) ***
  useEffect(() => {
    if (isDrawerMenuOpen)
      history.pushState({ isDrawerMenuOpen: true }, "", window.location.href);

    const handlePopState = () => {
      if (isDrawerMenuOpen) dispatch(setCurrentMenu(path));
    };

    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  }, [isDrawerMenuOpen]);

  //! ***********************************************************************************************************

  return (
    isMounted && (
      <div
        ref={ScrollableContainerRef}
        className="fixed z-10 top-[49px] left-0 w-screen bg-base-100 overflow-y-auto  duration-[400ms]"
        style={{ ...style, height: "calc(100vh - 49px)" }}
      >
        <div className="pt-4 pb-6 px-6 text-2xl font-bold">
          <h2>Notifications</h2>
        </div>
        {isAnyNotification ? (
          <CatagorizedNotifications
            catagorizedNotifications={catagorizedNotifications}
          />
        ) : (
          <div>
            <div className="text-sm grid justify-items-center gap-y-4 px-11 text-center">
              <ActivityOnYourPostsIcon />
              <h2>Activity On Your Posts</h2>
              <p>
                When someone likes or comments on one of your posts, you&apos;ll
                see it here.
              </p>
            </div>
            <div className="mt-12">
              <h2 className="font-semibold px-3 pb-4">Suggested For You</h2>
              <SuggestedForYouList
                recomendations={recomendations}
                maxWidth={1000}
                insideOf="mobileNotifications"
                ScrollableContainerRef={ScrollableContainerRef}
              />
            </div>
            <Link
              href={"/explore/people"}
              className="block text-sm font-medium text-primary py-3 px-4 text-center"
              onClick={() => dispatch(setCurrentMenu("explore"))}
              prefetch={true}
            >
              See All Suggestions
            </Link>
          </div>
        )}
      </div>
    )
  );
}
export default NotificationsDrawer;
