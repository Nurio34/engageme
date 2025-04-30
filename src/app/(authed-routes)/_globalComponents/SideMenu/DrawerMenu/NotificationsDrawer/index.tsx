import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import Notification from "./Notification";
import { MediaType } from "@prisma/client";

export type User = {
  name: string;
  avatar: string;
  userId: string;
};

export type MediaInterface = {
  type: MediaType;
  url: string;
};

export type NotificationTypeInterface =
  | "postLikeNotification"
  | "postCommentNotification"
  | "commentLikeNotification"
  | "replyNotification"
  | "replyLikeNotification";

export type NotificationType = {
  postId: string;
  users: User[];
  post: string;
  createdAt: Date;
  type: NotificationTypeInterface;
  media: MediaInterface;
  comment?: string;
  commentId?: string;
};

function NotificationsDrawer({ navWidth }: { navWidth: number }) {
  const { isDrawerMenuOpen, currentMenu } = useAppSelector((s) => s.sideMenu);
  const {
    postLikeNotifications,
    postCommentNotifications,
    postCommentLikeNotifications,
    replyCommentNotifications,
    replyCommentLikeNotifications,
  } = useAppSelector((s) => s.notifications);

  const [postLikeNotificationsState, setPostLikeNotificationsState] = useState<
    NotificationType[]
  >([]);

  const [postCommentNotificationsState, setPostCommentNotificationsState] =
    useState<NotificationType[]>([]);

  const [postCommentLikeNotificationsState, setPostCommentLikeNotifications] =
    useState<NotificationType[]>([]);

  const [replyCommentNotificationsState, setReplyCommentNotificationsState] =
    useState<NotificationType[]>([]);

  const [
    replyCommentLikeNotificationsState,
    setReplyCommentLikeNotificationsState,
  ] = useState<NotificationType[]>([]);

  const allNotifications = [
    ...postLikeNotificationsState,
    ...postCommentNotificationsState,
    ...postCommentLikeNotificationsState,
    ...replyCommentNotificationsState,
    ...replyCommentLikeNotificationsState,
  ].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  useEffect(() => {
    const notifications = postLikeNotifications.reduce(
      (arr: NotificationType[], notification) => {
        const postId = notification.postLike.postId;
        const username = notification.postLike.user.name;
        const avatar = notification.postLike.user.avatar;
        const userId = notification.postLike.user.id;
        const post = notification.postLike.post.message;
        const createdAt = notification.createdAt;
        const media = {
          type: notification.postLike.post.medias[0].type,
          url: notification.postLike.post.medias[0].url,
        };

        const isAnyNotificationWithSamePostId = arr.some(
          (notification) => notification.postId === postId
        );

        if (arr.length === 0 || !isAnyNotificationWithSamePostId)
          arr.push({
            postId,
            users: [
              {
                name: username,
                avatar: avatar || "./placeholders/avatar.webp",
                userId,
              },
            ],
            post,
            createdAt,
            type: "postLikeNotification",
            media,
          });
        else {
          arr = arr.map((notifArr) =>
            notifArr.postId === postId
              ? {
                  ...notifArr,
                  users: [
                    {
                      name: username,
                      avatar: avatar || "./placeholders/avatar.webp",
                      userId,
                    },
                    ...notifArr.users,
                  ],
                  createdAt,
                }
              : notifArr
          );
        }

        return arr;
      },
      []
    );

    setPostLikeNotificationsState(notifications);
  }, [postLikeNotifications]);

  useEffect(() => {
    const notifications = postCommentNotifications.reduce(
      (arr: NotificationType[], notification) => {
        const postId = notification.comment.postId;
        const username = notification.comment.user.name;
        const avatar = notification.comment.user.avatar;
        const userId = notification.comment.userId;
        const post = notification.comment.post.message;
        const createdAt = notification.createdAt;
        const comment = notification.comment.comment;
        const media = {
          type: notification.comment.post.medias[0].type,
          url: notification.comment.post.medias[0].url,
        };

        const isAnyNotificationWithSamePostId = arr.some(
          (notification) => notification.postId === postId
        );

        if (arr.length === 0 || !isAnyNotificationWithSamePostId)
          arr.push({
            postId,
            users: [
              {
                name: username,
                avatar: avatar || "./placeholders/avatar.webp",
                userId,
              },
            ],
            post,
            createdAt,
            type: "postCommentNotification",
            media,
            comment,
          });
        else {
          arr = arr.map((notifArr) =>
            notifArr.postId === postId
              ? {
                  ...notifArr,
                  users: Array.from(
                    new Map(
                      [
                        {
                          name: username,
                          avatar: avatar || "./placeholders/avatar.webp",
                          userId,
                        },
                        ...notifArr.users,
                      ].map((user) => [user.userId, user])
                    ).values()
                  ),

                  createdAt,
                  comment,
                }
              : notifArr
          );
        }

        return arr;
      },
      []
    );
    setPostCommentNotificationsState(notifications);
  }, [postCommentNotifications]);

  useEffect(() => {
    const notifications = postCommentLikeNotifications.reduce(
      (arr: NotificationType[], notification) => {
        const postId = notification.commentLike.comment.postId;
        const username = notification.commentLike.user.name;
        const avatar = notification.commentLike.user.avatar;
        const userId = notification.commentLike.userId;
        const post = notification.commentLike.comment.post.message;
        const comment = notification.commentLike.comment.comment;
        const createdAt = notification.createdAt;
        const media = {
          type: notification.commentLike.comment.post.medias[0].type,
          url: notification.commentLike.comment.post.medias[0].url,
        };

        const isAnyNotificationWithSamePostId = arr.some(
          (notification) => notification.postId === postId
        );

        if (arr.length === 0 || !isAnyNotificationWithSamePostId)
          arr.push({
            postId,
            users: [
              {
                name: username,
                avatar: avatar || "./placeholders/avatar.webp",
                userId,
              },
            ],
            post,
            createdAt,
            type: "commentLikeNotification",
            media,
            comment,
          });
        else {
          arr = arr.map((notifArr) =>
            notifArr.postId === postId
              ? {
                  ...notifArr,
                  users: [
                    {
                      name: username,
                      avatar: avatar || "./placeholders/avatar.webp",
                      userId,
                    },
                    ...notifArr.users,
                  ],
                  createdAt,
                }
              : notifArr
          );
        }

        return arr;
      },
      []
    );

    setPostCommentLikeNotifications(notifications);
  }, [postCommentLikeNotifications]);

  useEffect(() => {
    const notifications = replyCommentNotifications.reduce(
      (arr: NotificationType[], notification) => {
        const commentId = notification.comment.postComment.id;
        const username = notification.comment.user.name;
        const avatar = notification.comment.user.avatar;
        const userId = notification.comment.userId;
        const post = notification.comment.postComment.post.message;
        const postId = notification.comment.postComment.postId;
        const comment = notification.comment.comment;
        const createdAt = notification.createdAt;

        const media = {
          type: notification.comment.postComment.post.medias[0].type,
          url: notification.comment.postComment.post.medias[0].url,
        };

        const isAnyNotificationWithSameCommentId = arr.some(
          (notification) => notification.commentId === commentId
        );

        if (arr.length === 0 || !isAnyNotificationWithSameCommentId) {
          arr.push({
            commentId,
            postId,
            users: [
              {
                name: username,
                avatar: avatar || "./placeholders/avatar.webp",
                userId,
              },
            ],
            post,
            createdAt,
            type: "replyNotification",
            media,
            comment,
          });
        } else {
          arr = arr.map((notifArr) =>
            notifArr.commentId === commentId
              ? {
                  ...notifArr,
                  users: Array.from(
                    new Map(
                      [
                        {
                          name: username,
                          avatar: avatar || "./placeholders/avatar.webp",
                          userId,
                        },
                        ...notifArr.users,
                      ].map((user) => [user.userId, user])
                    ).values()
                  ),
                  createdAt,
                  comment,
                }
              : notifArr
          );
        }

        return arr;
      },
      []
    );

    setReplyCommentNotificationsState(notifications);
  }, [replyCommentNotifications]);

  useEffect(() => {
    const notifications = replyCommentLikeNotifications.reduce(
      (arr: NotificationType[], notification) => {
        const postId = notification.commentLike.comment.postComment.postId;
        const username = notification.commentLike.user.name;
        const avatar = notification.commentLike.user.avatar;
        const userId = notification.commentLike.userId;
        const post = notification.commentLike.comment.postComment.post.message;

        const comment = notification.commentLike.comment.comment;
        const commentId = notification.commentLike.comment.postComment.id;
        const createdAt = notification.createdAt;
        const media = {
          type: notification.commentLike.comment.postComment.post.medias[0]
            .type,
          url: notification.commentLike.comment.postComment.post.medias[0].url,
        };

        const isAnyNotificationWithSameCommentId = arr.some(
          (notification) => notification.commentId === commentId
        );

        if (arr.length === 0 || !isAnyNotificationWithSameCommentId) {
          arr.push({
            commentId,
            postId,
            users: [
              {
                name: username,
                avatar: avatar || "./placeholders/avatar.webp",
                userId,
              },
            ],
            post,
            createdAt,
            type: "replyLikeNotification",
            media,
            comment,
          });
        } else {
          arr = arr.map((notifArr) =>
            notifArr.commentId === commentId
              ? {
                  ...notifArr,
                  users: Array.from(
                    new Map(
                      [
                        {
                          name: username,
                          avatar: avatar || "./placeholders/avatar.webp",
                          userId,
                        },
                        ...notifArr.users,
                      ].map((user) => [user.userId, user])
                    ).values()
                  ),
                  createdAt,
                  comment,
                }
              : notifArr
          );
        }

        return arr;
      },
      []
    );

    setReplyCommentLikeNotificationsState(notifications);
  }, [replyCommentLikeNotifications]);

  return (
    <div
      className={`fixed z-10 top-0 left-0 w-[397px] h-full  transition-transform duration-300
         bg-base-100 rounded-tr-xl rounded-br-xl shadow-[0px_0px_30px_0px] py-2 pr-2  
      `}
      style={{
        transform:
          isDrawerMenuOpen && currentMenu === "notifications"
            ? `translateX(calc(0% + ${navWidth}px))`
            : "translateX(-100%)",
      }}
    >
      <div className="pt-4 pb-6 px-6 text-2xl font-bold">
        <h2>Notifications</h2>
      </div>
      <ul className="rid gap-y-2">
        {allNotifications.map((notification, index) => (
          <Notification key={index} notification={notification} />
        ))}
      </ul>
    </div>
  );
}
export default NotificationsDrawer;
