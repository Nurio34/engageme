import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";

export type NotificationIndicator = {
  follow: number;
  comment: number;
  like: number;
};

const initialNotificationIndicator = { follow: 0, comment: 0, like: 0 };

export const useNotificationIndicator = () => {
  const {
    postLikeNotifications,
    postCommentNotifications,
    postCommentLikeNotifications,
    replyCommentNotifications,
    replyCommentLikeNotifications,
  } = useAppSelector((s) => s.notifications);

  const [notificationIndicator, setNotificationIndicator] =
    useState<NotificationIndicator>(initialNotificationIndicator);
  const { follow, comment, like } = notificationIndicator;
  const isAnyNotification = follow !== 0 || comment !== 0 || like !== 0;

  const [isRender, setIsRender] = useState(false);

  useEffect(() => {
    const allNotifications = [
      ...postLikeNotifications,
      ...postCommentNotifications,
      ...postCommentLikeNotifications,
      ...replyCommentNotifications,
      ...replyCommentLikeNotifications,
    ];

    // Accumulate counts using reduce
    const counts = allNotifications
      .filter((notification) => !notification.isSeen)
      .reduce(
        (acc, notification) => {
          // Ensure to copy the initial state to avoid mutation
          return {
            ...acc,
            [notification.variant]: acc[notification.variant] + 1,
          };
        },
        { follow: 0, comment: 0, like: 0 }
      );

    // Set the accumulated counts as state
    setNotificationIndicator(counts);
  }, [
    postLikeNotifications,
    postCommentNotifications,
    postCommentLikeNotifications,
    replyCommentNotifications,
    replyCommentLikeNotifications,
  ]);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setIsRender(true);

      const timer2 = setTimeout(() => {
        setIsRender(false);
      }, 5000);

      return () => clearTimeout(timer2);
    }, 1000);

    return () => clearTimeout(timer1);
  }, [notificationIndicator]);

  return { notificationIndicator, isAnyNotification, isRender };
};
