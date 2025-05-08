import { markSeenAllUnseenNotifications } from "@/app/actions/notification/markSeenAllUnseenNotifications";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setPostCommentLikeNotifications,
  setPostCommentNotifications,
  setPostLikeNotifications,
  setReplyCommentLikeNotifications,
  setReplyCommentNotifications,
} from "@/store/slices/notifications";
import { useEffect } from "react";

export const useMarkSeenAllUnseenNotifications = () => {
  const { currentMenu } = useAppSelector((s) => s.sideMenu);
  const { id: userId } = useAppSelector((s) => s.user);

  const {
    postLikeNotifications,
    postCommentNotifications,
    postCommentLikeNotifications,
    replyCommentNotifications,
    replyCommentLikeNotifications,
  } = useAppSelector((s) => s.notifications);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const markSeenAllUnseenNotificationsActions = async () => {
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

    if (currentMenu === "notifications") {
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
      markSeenAllUnseenNotificationsActions();
    }
  }, [currentMenu]);
};
