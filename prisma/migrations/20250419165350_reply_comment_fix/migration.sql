-- AlterEnum
ALTER TYPE "NotificationType" ADD VALUE 'replyComment';

-- AlterTable
ALTER TABLE "ReplyComment" ADD COLUMN     "replyId" TEXT;

-- CreateTable
CREATE TABLE "ReplyCommentNotification" (
    "id" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "userId" TEXT NOT NULL,
    "replyCommentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReplyCommentNotification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ReplyCommentNotification" ADD CONSTRAINT "ReplyCommentNotification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplyCommentNotification" ADD CONSTRAINT "ReplyCommentNotification_replyCommentId_fkey" FOREIGN KEY ("replyCommentId") REFERENCES "ReplyComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
