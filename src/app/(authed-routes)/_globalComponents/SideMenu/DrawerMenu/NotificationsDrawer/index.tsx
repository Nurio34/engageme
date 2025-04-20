import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import Notification from "./Notification";

export type NotificationType = {
  message: string;
  avatar: string | null;
  post?: string;
  comment?: string;
  reply?: string;
  postId: string;
  postCommentId?: string;
  createdAt: Date;
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
    const notifications = postLikeNotifications.map((notification) => {
      const message = `${notification.postLike.user.name} liked your post.`;
      const avatar = notification.postLike.user.avatar;
      const post = notification.postLike.post.message;
      const postId = notification.postLike.postId;
      const createdAt = notification.createdAt;

      return { message, avatar, post, postId, createdAt };
    });

    setPostLikeNotificationsState(notifications);
  }, [postLikeNotifications]);

  useEffect(() => {
    const notifications = postCommentNotifications.map((notification) => {
      const message = `${notification.comment.user.name} commented on your post.`;
      const avatar = notification.comment.user.avatar;
      const comment = notification.comment.comment;
      const postId = notification.comment.postId;
      const createdAt = notification.createdAt;

      return { message, avatar, comment, postId, createdAt };
    });
    setPostCommentNotificationsState(notifications);
  }, [postCommentNotifications]);

  useEffect(() => {
    const notifications = postCommentLikeNotifications.map((notification) => {
      const message = `${notification.commentLike.user.name} liked your comment.`;
      const avatar = notification.commentLike.user.avatar;
      const comment = notification.commentLike.comment.comment;
      const postId = notification.commentLike.comment.postId;
      const createdAt = notification.createdAt;

      return { message, avatar, comment, postId, createdAt };
    });

    setPostCommentLikeNotifications(notifications);
  }, [postCommentLikeNotifications]);

  useEffect(() => {
    const notifications = replyCommentNotifications.map((notification) => {
      const message = `${notification.comment.user.name} replied to your comment`;
      const avatar = notification.comment.user.avatar;
      const comment = notification.comment.comment;
      const postId = notification.comment.postComment.postId;
      const postCommentId = notification.comment.postComment.id;
      const createdAt = notification.createdAt;

      return { message, avatar, comment, postId, postCommentId, createdAt };
    });

    setReplyCommentNotificationsState(notifications);
  }, [replyCommentNotifications]);

  useEffect(() => {
    const notifications = replyCommentLikeNotifications.map((notification) => {
      const message = `${notification.commentLike.user.name} liked your reply.`;
      const avatar = notification.commentLike.user.avatar;
      const reply = notification.commentLike.comment.comment;
      const postId = notification.commentLike.comment.postComment.postId;
      const postCommentId = notification.commentLike.comment.postComment.id;
      const createdAt = notification.createdAt;

      return { message, avatar, reply, postId, postCommentId, createdAt };
    });

    setReplyCommentLikeNotificationsState(notifications);
  }, [replyCommentLikeNotifications]);

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
      <ul className="p-2 grid gap-y-2">
        {allNotifications.map((notification, index) => (
          <Notification key={index} notification={notification} />
        ))}
      </ul>
    </div>
  );
}
export default NotificationsDrawer;
