import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { usePathname } from "next/navigation";
import { setCurrentMenu } from "@/store/slices/sidemenu";
import {
  NotificationsIcon,
  NotificationsIconFocused,
} from "@/app/_globalComponents/Svg/SideMenuSvgs/NotificationsIcon";
import NotificationsIndicator from "./NotificationsIndicator";

import { useNotificationIndicator } from "./_hooks/useNotificationIndicator";
import {
  setPostCommentLikeNotifications,
  setPostCommentNotifications,
  setPostLikeNotifications,
  setReplyCommentLikeNotifications,
  setReplyCommentNotifications,
} from "@/store/slices/notifications";
import { markSeenAllUnseenNotifications } from "@/app/actions/notification/markSeenAllUnseenNotifications";

function Notifications() {
  const { currentMenu, isDrawerMenuOpen } = useAppSelector((s) => s.sideMenu);
  const { id: userId } = useAppSelector((s) => s.user);
  const {
    postLikeNotifications,
    postCommentNotifications,
    postCommentLikeNotifications,
    replyCommentNotifications,
    replyCommentLikeNotifications,
  } = useAppSelector((s) => s.notifications);

  const dispatch = useAppDispatch();

  const path = usePathname()?.slice(1);

  const { notificationIndicator, isAnyNotification, isRender } =
    useNotificationIndicator();

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

    try {
      await markSeenAllUnseenNotifications(
        userId,
        postLikeNotifications,
        postCommentNotifications,
        postCommentLikeNotifications,
        replyCommentNotifications,
        replyCommentLikeNotifications
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-start">
      <button
        className="w-full min-w-max hidden md:flex items-center justify-center lg:justify-start gap-x-4 overflow-hidden
          hover:bg-base-content/10 rounded-lg md:p-[1.25vh] lg:p-3
        "
        onClick={() => {
          markSeenAllUnseenNotificationsAction();
          if (currentMenu === "notifications") dispatch(setCurrentMenu(path));
          else dispatch(setCurrentMenu("notifications"));
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
        {!isDrawerMenuOpen && (
          <div
            className={`hidden lg:block ${
              currentMenu === "notifications" ? "transition-all font-bold" : ""
            }`}
          >
            Notifications
          </div>
        )}
      </button>
      {isAnyNotification && !isDrawerMenuOpen && (
        <NotificationsIndicator
          notificationIndicator={notificationIndicator}
          isRender={isRender}
        />
      )}
    </div>
  );
}
export default Notifications;
