-- AlterEnum
ALTER TYPE "NotificationType" ADD VALUE 'follow';

-- CreateTable
CREATE TABLE "FollowNotification" (
    "id" TEXT NOT NULL,
    "isSeen" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "followId" TEXT NOT NULL,

    CONSTRAINT "FollowNotification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FollowNotification" ADD CONSTRAINT "FollowNotification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FollowNotification" ADD CONSTRAINT "FollowNotification_followId_fkey" FOREIGN KEY ("followId") REFERENCES "Follow"("id") ON DELETE CASCADE ON UPDATE CASCADE;
