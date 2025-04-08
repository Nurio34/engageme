-- CreateTable
CREATE TABLE "PostCommentLike" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,

    CONSTRAINT "PostCommentLike_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PostCommentLike" ADD CONSTRAINT "PostCommentLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostCommentLike" ADD CONSTRAINT "PostCommentLike_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "PostComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
