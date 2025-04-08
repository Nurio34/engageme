/*
  Warnings:

  - A unique constraint covering the columns `[userId,commentId]` on the table `PostCommentLike` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "PostCommentLike_id_userId_idx" ON "PostCommentLike"("id", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "PostCommentLike_userId_commentId_key" ON "PostCommentLike"("userId", "commentId");
