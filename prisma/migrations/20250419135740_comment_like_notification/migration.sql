-- DropIndex
DROP INDEX "PostCommentNotification_userId_commentId_key";

-- DropIndex
DROP INDEX "PostLikeNotification_userId_idx";

-- DropIndex
DROP INDEX "PostLikeNotification_userId_postLikeId_key";

-- CreateTable
CREATE TABLE "CommentLikeNotification" (
    "id" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "userId" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CommentLikeNotification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CommentLikeNotification" ADD CONSTRAINT "CommentLikeNotification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentLikeNotification" ADD CONSTRAINT "CommentLikeNotification_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "PostComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
