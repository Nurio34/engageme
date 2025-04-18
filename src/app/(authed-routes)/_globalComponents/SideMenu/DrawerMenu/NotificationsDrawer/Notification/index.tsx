import {
  PrismaPostCommentNotificationType,
  PrismaPostLikeNotificationType,
} from "../../../../../../../../prisma/types/notification";

function Notification({
  notification,
}: {
  notification:
    | PrismaPostLikeNotificationType
    | PrismaPostCommentNotificationType;
}) {
  console.log({ notification });

  return <div></div>;
}
export default Notification;
