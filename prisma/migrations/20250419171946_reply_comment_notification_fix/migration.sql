/*
  Warnings:

  - You are about to drop the column `replyCommentId` on the `ReplyCommentNotification` table. All the data in the column will be lost.
  - Added the required column `commentId` to the `ReplyCommentNotification` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ReplyCommentNotification" DROP CONSTRAINT "ReplyCommentNotification_replyCommentId_fkey";

-- AlterTable
ALTER TABLE "ReplyCommentNotification" DROP COLUMN "replyCommentId",
ADD COLUMN     "commentId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ReplyCommentNotification" ADD CONSTRAINT "ReplyCommentNotification_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "ReplyComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
