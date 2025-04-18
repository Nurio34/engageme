import { useAppSelector } from "@/store/hooks";
import {
  PrismaPostCommentNotificationType,
  PrismaPostLikeNotificationType,
} from "../../../../../../../prisma/types/notification";
import { useEffect, useState } from "react";
import Notification from "./Notification";

function NotificationsDrawer({ navWidth }: { navWidth: number }) {
  const { isDrawerMenuOpen, currentMenu } = useAppSelector((s) => s.sideMenu);
  const { postLikeNotifications, postCommentNotifications } = useAppSelector(
    (s) => s.notifications
  );

  console.log({ postLikeNotifications, postCommentNotifications });

  const [allNotifications, setAllNotifications] = useState<
    (PrismaPostLikeNotificationType | PrismaPostCommentNotificationType)[]
  >([]);

  console.log(allNotifications);

  useEffect(() => {
    setAllNotifications([
      ...postLikeNotifications,
      ...postCommentNotifications,
    ]);
  }, [postLikeNotifications, postCommentNotifications]);

  return (
    <div
      className={`fixed z-10 top-0 left-0 w-[397px] h-full  transition-transform duration-300
         bg-base-100 rounded-tr-xl rounded-br-xl shadow-[0px_0px_30px_0px]    
      `}
      style={{
        transform:
          isDrawerMenuOpen && currentMenu === "notifications"
            ? `translateX(calc(0% + ${navWidth}px))`
            : "translateX(-100%)",
      }}
    >
      <ul>
        {allNotifications.map((notification) => (
          <Notification key={notification.id} notification={notification} />
        ))}
      </ul>
    </div>
  );
}
export default NotificationsDrawer;
