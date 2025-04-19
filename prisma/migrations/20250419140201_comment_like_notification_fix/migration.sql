/*
  Warnings:

  - You are about to drop the column `commentId` on the `CommentLikeNotification` table. All the data in the column will be lost.
  - Added the required column `commentLikeId` to the `CommentLikeNotification` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CommentLikeNotification" DROP CONSTRAINT "CommentLikeNotification_commentId_fkey";

-- AlterTable
ALTER TABLE "CommentLikeNotification" DROP COLUMN "commentId",
ADD COLUMN     "commentLikeId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "CommentLikeNotification" ADD CONSTRAINT "CommentLikeNotification_commentLikeId_fkey" FOREIGN KEY ("commentLikeId") REFERENCES "PostCommentLike"("id") ON DELETE CASCADE ON UPDATE CASCADE;
