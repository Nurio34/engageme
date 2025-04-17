-- CreateTable
CREATE TABLE "PostLikeNotification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "postLikeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PostLikeNotification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PostLikeNotification" ADD CONSTRAINT "PostLikeNotification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostLikeNotification" ADD CONSTRAINT "PostLikeNotification_postLikeId_fkey" FOREIGN KEY ("postLikeId") REFERENCES "PostLike"("id") ON DELETE CASCADE ON UPDATE CASCADE;
