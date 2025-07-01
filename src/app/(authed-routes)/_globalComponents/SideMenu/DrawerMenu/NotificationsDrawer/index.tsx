import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useCatagorizedNotifications } from "./_hooks/useCatagorizedNotifications";
import CatagorizedNotifications from "./CatagorizedNotifications";
import { PrismaRecomendationType } from "@/app/api/recomendation/handler/getRecomendations";
import SuggestedForYouList from "../../../SuggestedForYouList";
import Link from "next/link";
import { setCurrentMenu } from "@/store/slices/sidemenu";
import ActivityOnYourPostsIcon from "@/app/_globalComponents/Svg/Act";

function NotificationsDrawer({
  navWidth,
  recomendations,
}: {
  navWidth: number;
  recomendations: PrismaRecomendationType[];
}) {
  const { isDrawerMenuOpen, currentMenu } = useAppSelector((s) => s.sideMenu);
  const dispatch = useAppDispatch();

  const { catagorizedNotifications } = useCatagorizedNotifications();

  const isAnyNotification = catagorizedNotifications.some(
    (notification) => notification.notifications.length > 0
  );

  return (
    <div
      className={`fixed z-10 top-0 left-0 w-[397px] h-full overflow-y-auto  transition-transform duration-300
         bg-base-100 rounded-tr-xl rounded-br-xl shadow-[0px_0px_30px_0px] py-2 px-2  
      `}
      style={{
        transform:
          isDrawerMenuOpen && currentMenu === "notifications"
            ? `translateX(calc(0% + ${navWidth}px))`
            : "translateX(-100%)",
      }}
    >
      <div
        className="pt-4 pb-6 px-6 text-2xl font-bold
        flex justify-between items-center
      "
      >
        <h2>Notifications</h2>
        {/* <NotificationsPermissionRequestButton /> */}
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
            />
          </div>
          <Link
            href={"/explore/people"}
            className="block text-sm font-medium text-primary py-3 px-4 text-center"
            onClick={() => dispatch(setCurrentMenu("explore"))}
            prefetch
          >
            See All Suggestions
          </Link>
        </div>
      )}
    </div>
  );
}
export default NotificationsDrawer;
