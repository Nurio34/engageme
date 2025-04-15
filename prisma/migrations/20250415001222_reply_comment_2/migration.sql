-- CreateTable
CREATE TABLE "ReplyCommentLike" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,

    CONSTRAINT "ReplyCommentLike_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ReplyCommentLike_id_userId_idx" ON "ReplyCommentLike"("id", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "ReplyCommentLike_userId_commentId_key" ON "ReplyCommentLike"("userId", "commentId");

-- AddForeignKey
ALTER TABLE "ReplyCommentLike" ADD CONSTRAINT "ReplyCommentLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplyCommentLike" ADD CONSTRAINT "ReplyCommentLike_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "ReplyComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
