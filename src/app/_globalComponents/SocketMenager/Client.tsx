import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useAppDispatch, useAppSelector } from "@/store/hooks"; // your own typed hooks
import { clearSocket, setSocket } from "@/store/slices/socket";
import {
  PrismaFollowNotification,
  PrismaPostCommentLikeNotificationType,
  PrismaPostCommentNotificationType,
  PrismaPostLikeNotificationType,
  PrismaReplyLikeNotificationType,
  PrismaReplyNotificationType,
} from "../../../../prisma/types/notification";
import {
  addCommentLikeNotification,
  addPostCommentNotification,
  addPostLikeNotification,
  addReplyNotification,
  addReplyLikeNotification,
  addFollowNotification,
} from "@/store/slices/notifications";

let socketInstance: Socket | null = null; // Singleton

const Client = () => {
  const { id } = useAppSelector((s) => s.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!socketInstance && id) {
      socketInstance = io(process.env.NEXT_PUBLIC_SERVER_URL as string);

      socketInstance.on("connect", () => {
        console.log("Socket connected:", socketInstance?.id);
      });

      socketInstance.on("disconnect", () => {
        console.log("Socket disconnected");
      });

      socketInstance.emit("addUser", id);

      socketInstance.on(
        "postLikeNotification",
        (notification: PrismaPostLikeNotificationType) => {
          dispatch(addPostLikeNotification(notification));
        }
      );

      socketInstance.on(
        "postCommentNotification",
        (notification: PrismaPostCommentNotificationType) => {
          dispatch(addPostCommentNotification(notification));
        }
      );

      socketInstance.on(
        "commentLikeNotification",
        (notification: PrismaPostCommentLikeNotificationType) => {
          dispatch(addCommentLikeNotification(notification));
        }
      );

      socketInstance.on(
        "replyNotification",
        (notification: PrismaReplyNotificationType) => {
          dispatch(addReplyNotification(notification));
        }
      );

      socketInstance.on(
        "replyLikeNotification",
        (notification: PrismaReplyLikeNotificationType) => {
          dispatch(addReplyLikeNotification(notification));
        }
      );

      socketInstance.on(
        "followNotification",
        (notification: PrismaFollowNotification) => {
          console.log("dispatch(addFollowNotification(notification));");

          dispatch(addFollowNotification(notification));
        }
      );

      dispatch(setSocket(socketInstance));
    }

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
        dispatch(clearSocket());
        socketInstance = null;
      }
    };
  }, [dispatch, id]);

  return null; // This component doesn't render anything
};

export default Client;
