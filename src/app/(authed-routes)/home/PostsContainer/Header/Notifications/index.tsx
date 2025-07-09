import { useNotificationIndicator } from "@/app/(authed-routes)/_globalComponents/SideMenu/MenuItem/Notifications/_hooks/useNotificationIndicator";
import {
  NotificationsIcon,
  NotificationsIconFocused,
} from "@/app/_globalComponents/Svg/SideMenuSvgs/NotificationsIcon";
import { markSeenAllUnseenNotifications } from "@/app/actions/notification/markSeenAllUnseenNotifications";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setFollowNotifications,
  setPostCommentLikeNotifications,
  setPostCommentNotifications,
  setPostLikeNotifications,
  setReplyCommentLikeNotifications,
  setReplyCommentNotifications,
} from "@/store/slices/notifications";
import { setCurrentMenu } from "@/store/slices/sidemenu";
import { usePathname } from "next/navigation";
import NotificationsIndicator from "./NotificationsIndicator";
import NotificationsDrawer from "./NotificationsDrawer";
import { PrismaRecomendationType } from "../../../../../../../prisma/types/recomendation";

function Notifications({
  recomendations,
}: {
  recomendations: PrismaRecomendationType[];
}) {
  const { id: userId } = useAppSelector((s) => s.user);

  const { device } = useAppSelector((s) => s.modals);
  const isMobile = device.type === "mobile";

  const { currentMenu, isDrawerMenuOpen } = useAppSelector((s) => s.sideMenu);

  const {
    postLikeNotifications,
    postCommentNotifications,
    postCommentLikeNotifications,
    replyCommentNotifications,
    replyCommentLikeNotifications,
    followNotifications,
  } = useAppSelector((s) => s.notifications);

  const { notificationIndicator, isAnyNotification, isRender } =
    useNotificationIndicator();

  const dispatch = useAppDispatch();

  const path = usePathname()?.slice(1);

  const markSeenAllUnseenNotificationsAction = async () => {
    dispatch(
      setPostLikeNotifications(
        postLikeNotifications.map((notfication) => ({
          ...notfication,
          isSeen: true,
        }))
      )
    );
    dispatch(
      setPostCommentNotifications(
        postCommentNotifications.map((notfication) => ({
          ...notfication,
          isSeen: true,
        }))
      )
    );
    dispatch(
      setPostCommentLikeNotifications(
        postCommentLikeNotifications.map((notfication) => ({
          ...notfication,
          isSeen: true,
        }))
      )
    );
    dispatch(
      setReplyCommentNotifications(
        replyCommentNotifications.map((notfication) => ({
          ...notfication,
          isSeen: true,
        }))
      )
    );
    dispatch(
      setReplyCommentLikeNotifications(
        replyCommentLikeNotifications.map((notfication) => ({
          ...notfication,
          isSeen: true,
        }))
      )
    );
    dispatch(
      setFollowNotifications(
        followNotifications.map((notfication) => ({
          ...notfication,
          isSeen: true,
        }))
      )
    );

    try {
      await markSeenAllUnseenNotifications(
        userId,
        postLikeNotifications,
        postCommentNotifications,
        postCommentLikeNotifications,
        replyCommentNotifications,
        replyCommentLikeNotifications,
        followNotifications
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    isMobile && (
      <div className="relative flex items-center ">
        <button
          type="button"
          onClick={() => {
            if (currentMenu === "notifications") {
              dispatch(setCurrentMenu(path));
              history.back();
            } else {
              markSeenAllUnseenNotificationsAction();
              dispatch(setCurrentMenu("notifications"));
            }
          }}
        >
          {currentMenu === "notifications" ? (
            <NotificationsIconFocused />
          ) : (
            <div className="relative">
              <NotificationsIcon />
              {isAnyNotification && !isDrawerMenuOpen && (
                <div
                  className="absolute z-10 top-0 -right-[1px]
                          w-2 aspect-square rounded-full bg-[rgb(255,48,64)]
                        "
                />
              )}
            </div>
          )}
        </button>
        {isAnyNotification && !isDrawerMenuOpen && (
          <NotificationsIndicator
            notificationIndicator={notificationIndicator}
            isRender={isRender}
          />
        )}
        <NotificationsDrawer recomendations={recomendations} />
      </div>
    )
  );
}
export default Notifications;
