/*
  Warnings:

  - A unique constraint covering the columns `[userId,commentId]` on the table `PostCommentNotification` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "PostCommentNotification_commentId_key";

-- AlterTable
ALTER TABLE "PostCommentNotification" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "PostCommentNotification_userId_commentId_key" ON "PostCommentNotification"("userId", "commentId");
