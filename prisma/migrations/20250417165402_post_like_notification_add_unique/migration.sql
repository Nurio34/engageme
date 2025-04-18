/*
  Warnings:

  - A unique constraint covering the columns `[userId,postLikeId]` on the table `PostLikeNotification` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PostLikeNotification_userId_postLikeId_key" ON "PostLikeNotification"("userId", "postLikeId");
