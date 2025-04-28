import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useAppDispatch, useAppSelector } from "@/store/hooks"; // your own typed hooks
import { clearSocket, setSocket } from "@/store/slices/socket";
import { PrismaPostLikeNotificationType } from "../../../../prisma/types/notification";
import { addPostLikeNotification } from "@/store/slices/notifications";

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
          console.log(notification);

          dispatch(addPostLikeNotification(notification));
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
