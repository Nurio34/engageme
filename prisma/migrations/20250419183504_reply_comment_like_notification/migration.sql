-- AlterEnum
ALTER TYPE "NotificationType" ADD VALUE 'replyLike';

-- CreateTable
CREATE TABLE "ReplyCommentLikeNotification" (
    "id" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "userId" TEXT NOT NULL,
    "commentLikeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReplyCommentLikeNotification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ReplyCommentLikeNotification" ADD CONSTRAINT "ReplyCommentLikeNotification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplyCommentLikeNotification" ADD CONSTRAINT "ReplyCommentLikeNotification_commentLikeId_fkey" FOREIGN KEY ("commentLikeId") REFERENCES "ReplyCommentLike"("id") ON DELETE CASCADE ON UPDATE CASCADE;
