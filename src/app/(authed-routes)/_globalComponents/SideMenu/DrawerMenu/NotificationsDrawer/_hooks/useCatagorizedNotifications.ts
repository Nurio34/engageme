import { useAppSelector } from "@/store/hooks";
import {
  CatagorizedNotificationType,
  initialCatagorizedNotifications,
  NotificationType,
} from "../../types";
import { useEffect, useState } from "react";
import { detectTime } from "../_utils/detectTime";

export const useCatagorizedNotifications = () => {
  const {
    postLikeNotifications,
    postCommentNotifications,
    postCommentLikeNotifications,
    replyCommentNotifications,
    replyCommentLikeNotifications,
    followNotifications,
  } = useAppSelector((s) => s.notifications);
  console.log({ followNotifications });

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

  const catagorizedNotifications = [
    ...postLikeNotificationsState,
    ...postCommentNotificationsState,
    ...postCommentLikeNotificationsState,
    ...replyCommentNotificationsState,
    ...replyCommentLikeNotificationsState,
  ]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .reduce((array: CatagorizedNotificationType[], notification) => {
      const { isNew, isYesterday, isThisWeek, isThisMonth } = detectTime(
        new Date(notification.createdAt)
      );

      const newArray = array.map((item) => ({
        ...item,
        notifications: [...item.notifications],
      }));

      const categoryMap = new Map<string, CatagorizedNotificationType>(
        newArray.map((category) => [category.time, category])
      );

      let categoryKey: string = "earlier";
      if (isNew) categoryKey = "new";
      else if (isYesterday) categoryKey = "yesterday";
      else if (isThisWeek) categoryKey = "this week";
      else if (isThisMonth) categoryKey = "this month";

      categoryMap.get(categoryKey)?.notifications.push(notification);

      return Array.from(categoryMap.values());
    }, JSON.parse(JSON.stringify(initialCatagorizedNotifications)) as CatagorizedNotificationType[]);

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

  return { catagorizedNotifications };
};
