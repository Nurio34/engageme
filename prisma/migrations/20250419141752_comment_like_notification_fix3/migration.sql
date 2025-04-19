/*
  Warnings:

  - You are about to drop the `CommentLikeNotification` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CommentLikeNotification" DROP CONSTRAINT "CommentLikeNotification_commentLikeId_fkey";

-- DropForeignKey
ALTER TABLE "CommentLikeNotification" DROP CONSTRAINT "CommentLikeNotification_userId_fkey";

-- DropTable
DROP TABLE "CommentLikeNotification";

-- CreateTable
CREATE TABLE "PostCommentLikeNotification" (
    "id" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "userId" TEXT NOT NULL,
    "commentLikeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PostCommentLikeNotification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PostCommentLikeNotification" ADD CONSTRAINT "PostCommentLikeNotification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostCommentLikeNotification" ADD CONSTRAINT "PostCommentLikeNotification_commentLikeId_fkey" FOREIGN KEY ("commentLikeId") REFERENCES "PostCommentLike"("id") ON DELETE CASCADE ON UPDATE CASCADE;
